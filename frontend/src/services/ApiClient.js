const ApiClient = {
  uploadPrescription: async ({ file, orderId = null, onProgress = null }) => {
    // Compute checksum and clientId
    const clientId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : ('cid-' + Date.now() + '-' + Math.random().toString(36).slice(2,8));
    async function computeChecksum(f){
      const buffer = await f.arrayBuffer();
      const hash = await crypto.subtle.digest('SHA-256', buffer);
      const arr = Array.from(new Uint8Array(hash));
      return arr.map(b => b.toString(16).padStart(2,'0')).join('');
    }

    const checksum = await computeChecksum(file);

    // Use XMLHttpRequest to get progress events (fetch doesn't have progress natively)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = '/api/prescriptions';
      const fd = new FormData();
      fd.append('file', file, file.name);
      if (orderId) fd.append('orderId', orderId);
      fd.append('checksum', checksum);
      fd.append('clientId', clientId);

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Accept', 'application/json');

      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable && onProgress) onProgress(evt.loaded / evt.total);
      };

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status >= 400 && xhr.status < 500) {
          // client error -> don't retry; surface message
          try { reject(new Error(JSON.parse(xhr.responseText).message || xhr.responseText)); } catch(e){ reject(new Error(xhr.statusText || 'Upload failed')) }
        } else {
          // server or network error: save to pending queue for retry
          try {
            const reader = new FileReader();
            reader.onload = function(){
              const data = { clientId, checksum, name: file.name, type: file.type, size: file.size, content: reader.result, orderId };
              try { window.PendingPrescriptions && window.PendingPrescriptions.add && window.PendingPrescriptions.add(data) } catch(e){}
              // also persist to StorageService for compatibility
              try { window.StorageService && window.StorageService.set('pending_prescriptions', clientId, data) } catch(e){}
              reject(new Error('Offline — saved locally for later sync'));
            };
            reader.readAsDataURL(file);
          } catch(e){
            reject(new Error(xhr.responseText || 'Upload failed'));
          }
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));
      xhr.send(fd);
    });
  }
}

export default ApiClient;
import Pending from './pendingPrescriptions'
import ApiClient from './ApiClient'

const SYNC_INTERVAL = parseInt(window.SYNC_PENDING_INTERVAL || 60000);

async function uploadDataUrl(item, onProgress){
  // item.content is dataURL. Convert to Blob
  const dataUrl = item.content;
  const matches = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!matches) throw new Error('Invalid data URL');
  const mime = matches[1];
  const bstr = atob(matches[2]);
  let n = bstr.length;
  const u8 = new Uint8Array(n);
  while (n--) u8[n] = bstr.charCodeAt(n);
  const blob = new Blob([u8], { type: mime });
  const file = new File([blob], item.name || ('file-' + item.clientId), { type: mime });
  return ApiClient.uploadPrescription({ file, orderId: item.orderId, onProgress });
}

async function checkServerForChecksum(checksum){
  try {
    const res = await fetch(`/api/prescriptions/lookup?checksum=${encodeURIComponent(checksum)}`);
    if (res.ok) return await res.json();
    return null;
  } catch (e) { return null; }
}

async function syncOnce(){
  const items = await Pending.getAll();
  for (const item of items){
    try {
      // pre-check via checksum
      const found = await checkServerForChecksum(item.checksum);
      if (found) { await Pending.remove(item.clientId); continue; }

      // upload
      await uploadDataUrl(item);
      await Pending.remove(item.clientId);
    } catch (err) {
      // If client error, remove and do not retry
      const msg = err.message || '';
      if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('file too large') || msg.toLowerCase().includes('invalid file type')) {
        await Pending.remove(item.clientId);
      }
      // otherwise leave for next retry
    }
  }
}

// export syncOnce for testing
export { syncOnce };


let intervalId = null;

function start(){
  if (typeof window === 'undefined') return;
  // run on online
  window.addEventListener('online', () => { syncOnce(); });
  // periodic timer
  if (!intervalId) intervalId = setInterval(syncOnce, SYNC_INTERVAL);
  // attempt an immediate sync
  syncOnce();
}

function stop(){ if (intervalId) clearInterval(intervalId); intervalId = null; }

export default { start, stop };

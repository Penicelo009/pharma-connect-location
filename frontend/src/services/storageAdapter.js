// storageAdapter: tries backend storage API, falls back to window.StorageService (client-side)
const storageAdapter = {
  async get(namespace, key){
    // try backend
    try {
      const res = await fetch(`/api/storage/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`);
      if (res.ok){
        const json = await res.json();
        return json.value;
      }
    } catch (e){}

    // fallback to frontend StorageService if present
    try {
      if (typeof window !== 'undefined' && window.StorageService && typeof window.StorageService.get === 'function'){
        return await window.StorageService.get(namespace, key);
      }
      // last resort localStorage key
      const raw = localStorage.getItem(`${namespace}:${key}`);
      return raw ? JSON.parse(raw) : undefined;
    } catch (e){ return undefined }
  },

  async set(namespace, key, value){
    try {
      const res = await fetch(`/api/storage/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ value }) });
      if (res.ok) return true;
    } catch (e){}

    try {
      if (typeof window !== 'undefined' && window.StorageService && typeof window.StorageService.set === 'function'){
        return await window.StorageService.set(namespace, key, value);
      }
      localStorage.setItem(`${namespace}:${key}`, JSON.stringify(value));
      return true;
    } catch (e){ return false }
  }
}

export default storageAdapter;
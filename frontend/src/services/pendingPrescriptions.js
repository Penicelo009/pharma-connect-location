// pendingPrescriptions: stores pending items in localStorage and mirrors to StorageService manifest
const LOCAL_KEY = 'pending_prescriptions_list';

function readLocal(){
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function writeLocal(list){
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(list)); } catch(e){}
}

async function add(item){
  const list = readLocal();
  list.push(item);
  writeLocal(list);
  // mirror to StorageService with manifest
  try {
    if (window.StorageService && window.StorageService.set) {
      // set by clientId
      await window.StorageService.set('pending_prescriptions', item.clientId, item);
      // update manifest
      const manifest = list.map(i => i.clientId);
      await window.StorageService.set('pending_prescriptions', 'manifest', manifest);
    }
  } catch (e){}
}

async function remove(clientId){
  const list = readLocal().filter(i => i.clientId !== clientId);
  writeLocal(list);
  try {
    if (window.StorageService && window.StorageService.delete) {
      await window.StorageService.delete('pending_prescriptions', clientId);
      const manifest = list.map(i => i.clientId);
      await window.StorageService.set('pending_prescriptions', 'manifest', manifest);
    }
  } catch (e){}
}

async function getAll(){
  const local = readLocal();
  const results = [...local];
  try {
    if (window.StorageService && window.StorageService.get) {
      const manifest = await window.StorageService.get('pending_prescriptions', 'manifest');
      if (manifest && Array.isArray(manifest)){
        for (const id of manifest){
          try {
            const item = await window.StorageService.get('pending_prescriptions', id);
            if (item && !results.find(r => r.clientId === item.clientId)) results.push(item);
          } catch(e){}
        }
      }
    }
  } catch(e){}
  return results;
}

export default { add, remove, getAll };

/** @jest-environment jsdom */
import Pending from '../src/services/pendingPrescriptions'
import Sync from '../src/services/syncPending'

// Mock fetch and ApiClient
global.fetch = jest.fn();
import ApiClient from '../src/services/ApiClient'
jest.mock('../src/services/ApiClient');

beforeEach(()=>{ localStorage.clear(); fetch.mockReset(); ApiClient.uploadPrescription.mockReset(); window.StorageService = { get: jest.fn(), set: jest.fn(), delete: jest.fn() }; });

test('sync removes item when server lookup finds existing', async () =>{
  // put pending item
  const item = { clientId: 'x1', checksum: 'ch1', name: 'rx.pdf', content: 'data:image/png;base64,AAAA', orderId: 5 };
  await Pending.add(item);
  // mock lookup response
  fetch.mockImplementation((url)=>{
    if (url.includes('/api/prescriptions/lookup')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 123, status: 'pending' }) });
    return Promise.resolve({ ok: false });
  });

  await Sync.start();
  // allow some time for immediate syncOnce to run
  await new Promise(r => setTimeout(r, 200));
  const list = JSON.parse(localStorage.getItem('pending_prescriptions_list') || '[]');
  expect(list.find(i => i.clientId === 'x1')).toBeFalsy();
});

test('sync uploads dataurl and removes on success', async () =>{
  const item = { clientId: 'x2', checksum: 'ch2', name: 'rx2.pdf', content: 'data:application/pdf;base64,AAAA', orderId: 7 };
  await Pending.add(item);
  // lookup returns not found
  fetch.mockImplementation((url)=>{
    if (url.includes('/api/prescriptions/lookup')) return Promise.resolve({ ok: false });
    return Promise.resolve({ ok: false });
  });
  ApiClient.uploadPrescription.mockResolvedValue({ id: 55, status: 'pending' });
  await Sync.start();
  await new Promise(r => setTimeout(r, 300));
  const list = JSON.parse(localStorage.getItem('pending_prescriptions_list') || '[]');
  expect(list.find(i => i.clientId === 'x2')).toBeFalsy();
});

test('sync removes unrecoverable 4xx errors', async () =>{
  const item = { clientId: 'x3', checksum: 'ch3', name: 'rx3.pdf', content: 'data:application/pdf;base64,AAAA' };
  await Pending.add(item);
  fetch.mockImplementation((url)=>{
    if (url.includes('/api/prescriptions/lookup')) return Promise.resolve({ ok: false });
    return Promise.resolve({ ok: false });
  });
  const err = new Error('File too large'); err.message = 'File too large';
  ApiClient.uploadPrescription.mockRejectedValue(err);
  await Sync.start();
  await new Promise(r => setTimeout(r, 300));
  const list = JSON.parse(localStorage.getItem('pending_prescriptions_list') || '[]');
  expect(list.find(i => i.clientId === 'x3')).toBeFalsy();
});

/** @jest-environment jsdom */
import Pending from '../src/services/pendingPrescriptions'

describe('pendingPrescriptions storage', () => {
  beforeEach(() => { localStorage.clear(); window.StorageService = { set: jest.fn(), get: jest.fn(), delete: jest.fn() } });

  test('add stores to localStorage and mirrors to StorageService', async () => {
    const item = { clientId: 'cid1', checksum: 'abc', name: 'rx.pdf', content: 'data:;base64,aaa' };
    await Pending.add(item);
    const raw = localStorage.getItem('pending_prescriptions_list');
    const list = JSON.parse(raw);
    expect(list.find(i => i.clientId === 'cid1')).toBeTruthy();
    expect(window.StorageService.set).toHaveBeenCalled();
  });

  test('remove deletes and updates manifest', async () => {
    const item = { clientId: 'cid2', checksum: 'def', name: 'rx2.pdf', content: 'data:;base64,bbb' };
    await Pending.add(item);
    await Pending.remove('cid2');
    const raw = localStorage.getItem('pending_prescriptions_list');
    const list = JSON.parse(raw);
    expect(list.find(i => i.clientId === 'cid2')).toBeFalsy();
    expect(window.StorageService.delete).toHaveBeenCalled();
  });
});

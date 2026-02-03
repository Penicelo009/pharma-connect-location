const StorageService = require('../services/storageService');

exports.getItem = async (req, res, next) => {
  try {
    const { namespace, key } = req.params;
    const value = await StorageService.get(namespace, key);
    if (value === undefined) return res.status(404).json({ message: 'Not found' });
    res.json({ value });
  } catch (err) { next(err); }
};

exports.setItem = async (req, res, next) => {
  try {
    const { namespace, key } = req.params;
    const { value } = req.body;
    await StorageService.set(namespace, key, value);
    res.status(201).json({ message: 'Stored' });
  } catch (err) { next(err); }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { namespace, key } = req.params;
    await StorageService.delete(namespace, key);
    res.status(204).send();
  } catch (err) { next(err); }
};

const driverName = process.env.FILE_STORAGE_DRIVER || 'local';
const drivers = {
  local: require('./local')
};

if (!drivers[driverName]) throw new Error(`Unknown storage driver: ${driverName}`);

module.exports = drivers[driverName];

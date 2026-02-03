// apiVersion middleware: adds X-API-Version header to all responses
module.exports = (req, res, next) => {
  try {
    const ver = process.env.API_VERSION || '1';
    res.setHeader('X-API-Version', ver);
    // Also advertise deprecation only when set
    if (process.env.API_DEPRECATION === 'true') {
      res.setHeader('Deprecation', 'true');
      if (process.env.API_SUNSET) res.setHeader('Sunset', process.env.API_SUNSET);
    }
  } catch (e) {
    // ignore header errors
  }
  next();
};
require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Backend listening on port ${port} (${process.env.NODE_ENV || 'dev'})`);
});

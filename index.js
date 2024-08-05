const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [],
  requireHeader: [], // قم بإزالة الشرط الخاص بالرؤوس المطلوبة
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

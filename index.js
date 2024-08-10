const cors_proxy = require('cors-anywhere');
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [], // السماح بأي مصدر
  requireHeader: [], // إزالة الشرط الخاص بالرؤوس المطلوبة
  removeHeaders: [], // لا تزيل أي رؤوس
  setHeaders: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Cookie': 'open=true'
  },
  httpProxyOptions: {
    xfwd: false
  }
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

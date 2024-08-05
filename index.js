const cors_proxy = require('cors-anywhere');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [], // السماح بأي مصدر
  requireHeader: [], // إزالة الشرط الخاص بالرؤوس المطلوبة
  removeHeaders: [], // لا تزيل أي رؤوس
  setHeaders: { // إعداد رأس set-cookie
    'set-cookie': 'open=true; Path=/; HttpOnly'
  }
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

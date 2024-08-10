const cors_proxy = require('cors-anywhere');
const host = '0.0.0.0';
const port = process.env.PORT || 8080;

// إنشاء دالة لتوليد User-Agent عشوائي
function getRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

cors_proxy.createServer({
  originWhitelist: [], // السماح بأي مصدر
  requireHeader: [], // إزالة الشرط الخاص بالرؤوس المطلوبة
  removeHeaders: ['cookie', 'x-forwarded-for', 'x-real-ip'], // إزالة الرؤوس التي قد تكشف أنه وسيط
  setHeaders: {
    'User-Agent': getRandomUserAgent(),
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  },
  httpProxyOptions: {
    xfwd: false
  },
  redirectSameOrigin: true,
  cookieDomainRewrite: {
    '*': ''
  },
  cookies: {
    stripDomain: true,
    overwrite: true
  }
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

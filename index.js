const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('*', async (req, res) => {
  try {
    const targetUrl = req.url.slice(1); // إزالة '/' من بداية الـ URL
    
    // إنشاء كائن Headers جديد
    const headers = new fetch.Headers({
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    });

    // إجراء طلب أولي للحصول على الكوكيز
    const initialResponse = await fetch(targetUrl, { headers, redirect: 'manual' });
    
    // استخراج الكوكيز من الاستجابة
    const cookies = initialResponse.headers.raw()['set-cookie'];
    
    if (cookies) {
      headers.set('Cookie', cookies.join('; '));
    }

    // إجراء طلب ثانٍ باستخدام الكوكيز
    const response = await fetch(targetUrl, { headers });

    let html = await response.text();
    
    // استخدام Cheerio لتحليل وتعديل HTML
    const $ = cheerio.load(html);
    
    // إزالة جميع عناصر <script>
    $('script').remove();
    
    // إعادة بناء HTML
    html = $.html();
    
    // إرسال HTML المعدل
    res.send(html);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});

const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('*', async (req, res) => {
  try {
    const targetUrl = req.url.slice(1); // إزالة '/' من بداية الـ URL
    
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': 'open=true'
      }
    });

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

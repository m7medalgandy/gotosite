const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

app.get('*', async (req, res) => {
  try {
    const targetUrl = req.url.slice(1); // إزالة '/' من بداية الـ URL
    
        const headers = {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'CF-IPCountry': 'US',
      'CF-Connecting-IP': req.ip,
    };

    const response = await fetch(targetUrl, { 
      headers: headers,
      redirect: 'follow',
    });
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('image')) {
      res.set('Content-Type', contentType);
      response.body.pipe(res);
    } else {
      let html = await response.text();
      
      const $ = cheerio.load(html);
      $('script').remove();
      
      html = $.html();
      
      res.send(html);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});

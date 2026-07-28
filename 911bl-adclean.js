// Quantumult X script-response-body: 911bl.com ad cleaner
// Removes ad containers/scripts from HTML pages and injects defensive CSS.

const AD_PATTERNS = [
  '\\bads?\\b',
  'advert(?:ise|isement)?', 'banner', 'popup', 'popunder', 'float',
  'sponsor', 'promo(?:tion)?', 'googleads', 'adsbygoogle', 'doubleclick',
  'googlesyndication', 'googleadservices', 'cnzz', '51la', '51\\.la',
  'umeng', 'baidu', 'hm\\.baidu', 'tongji', '统计', '广告', '推广', '赞助'
];

function stripAds(html) {
  let body = html;
  const adWords = AD_PATTERNS.join('|');

  // Remove complete blocks with ad-like class/id/src/href/style/data attributes.
  const blockTags = ['script', 'iframe', 'ins', 'aside', 'section', 'div'];
  for (const tag of blockTags) {
    const re = new RegExp(`<${tag}\\b(?=[^>]*(?:id|class|src|href|style|data-[^=]+)=["'][^"']*(?:${adWords})[^"']*["'])[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
    body = body.replace(re, '');
  }

  // Remove singleton/media/link elements that point to ad/tracker resources.
  body = body.replace(new RegExp(`<(?:img|source|link|a)\\b(?=[^>]*(?:src|href|id|class|style|data-[^=]+)=["'][^"']*(?:${adWords})[^"']*["'])[^>]*>`, 'gi'), '');

  // Remove inline scripts that create ads/popups/trackers even when tag attributes look innocent.
  body = body.replace(/<script\b[^>]*>[\s\S]*?(?:adsbygoogle|googlesyndication|doubleclick|googleadservices|cnzz|51la|hm\.baidu|baidu\.com\/hm|window\.open|popunder|popup|adConfig|advert|广告)[\s\S]*?<\/script>/gi, '');

  // Remove noscript ad fallbacks.
  body = body.replace(new RegExp(`<noscript\\b[^>]*>[\\s\\S]*?(?:${adWords})[\\s\\S]*?<\\/noscript>`, 'gi'), '');

  // Defensive CSS catches dynamically generated or unusually nested ad nodes.
  const css = `<style id="qx-911bl-adclean">
[id^="ad" i], [class^="ad" i], [id*="-ad" i], [class*="-ad" i],
[id*="_ad" i], [class*="_ad" i], [id*="ads" i], [class*="ads" i],
[id*="advert" i], [class*="advert" i], [id*="banner" i], [class*="banner" i],
[id*="popup" i], [class*="popup" i], [id*="pop" i], [class*="pop" i],
[id*="float" i], [class*="float" i], [id*="sponsor" i], [class*="sponsor" i],
[id*="promo" i], [class*="promo" i], [class*="google" i], [id*="google" i],
iframe[src*="ad" i], iframe[src*="google" i], iframe[src*="doubleclick" i],
a[href*="ad" i], img[src*="ad" i], ins.adsbygoogle {
  display: none !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  min-width: 0 !important;
  min-height: 0 !important;
  pointer-events: none !important;
}
</style>`;

  if (body.includes('qx-911bl-adclean')) return body;
  if (/<head\b[^>]*>/i.test(body)) return body.replace(/<head\b[^>]*>/i, m => m + css);
  return css + body;
}

let headers = $response.headers || {};
let contentType = '';
for (const k in headers) {
  if (k.toLowerCase() === 'content-type') contentType = String(headers[k]).toLowerCase();
}

let body = $response.body || '';
if (!body || (contentType && !/html|text/.test(contentType))) {
  $done({});
} else {
  $done({ body: stripAds(body) });
}

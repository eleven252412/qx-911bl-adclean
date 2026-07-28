# 911bl Quantumult X 去广告规则

## 推荐订阅

这次基于你提供的 HAR 做规则，不再劫持 `911bl.com` 页面 HTML。

Filter 订阅：

```text
https://raw.githubusercontent.com/eleven252412/qx-911bl-adclean/main/911bl-adclean-filter.list
```

重写订阅保留为空规则，避免旧版继续导致网页无法加载：

```text
https://raw.githubusercontent.com/eleven252412/qx-911bl-adclean/main/911bl-adclean.conf
```

## HAR 证据

抓包文件：`/mnt/diskshare/Output/quantumult-x-2026-07-28-223520.har`

确认保留：

- `911bl.com`：主站，只出现 Cloudflare RUM，不拦截。
- `pic.uforxk.cn`：页面图片/内容图，202 条，不拦截。
- `op.vkjyoi.cn`：视频 m3u8 内容源，不拦截。

确认拦截：

- `729.d8q7k4xc.top:777`：由 `911bl.com` Referer 打开的广告落地页。
- `xv0sfr.f2k8v1lt.top:777`：广告落地页资源/二跳。
- `54.254.116.18` 等 IP：`/api/eventTracking/batchReport.json` 广告/埋点接口。
- `api-dc-prod-009.cyou` / `api-dc2-prod-09.cyou`：同类广告/埋点接口。

## 文件

- `911bl-adclean-filter.list`：实际使用的 QX Filter 规则。
- `911bl-adclean.conf`：安全空重写，防止旧版响应体脚本继续影响加载。
- `911bl-adclean.js`：旧响应体脚本，默认不再启用。

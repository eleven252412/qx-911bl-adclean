# 911bl Quantumult X 去广告规则

覆盖：

- `https://911bl.com/`
- `https://911bl.com/archives/191362/`
- 911bl.com 下所有文章页、分类页、分页、子路径

## Quantumult X 使用

订阅重写：

```text
https://raw.githubusercontent.com/eleven252412/qx-911bl-adclean/main/911bl-adclean.conf
```

或手动添加：

```ini
[rewrite_local]
^https?:\/\/911bl\.com\/.* url script-response-body https://raw.githubusercontent.com/eleven252412/qx-911bl-adclean/main/911bl-adclean.js
^https?:\/\/911bl\.com\/.*(?:ad|ads|advert|banner|popup|popunder|float|sponsor|promo|tongji|analytics|cnzz|51la|hm\.js|baidu).* url reject-dict
^https?:\/\/(?:[^\/]+\.)?(?:doubleclick\.net|googlesyndication\.com|googleadservices\.com|google-analytics\.com|google\.com\/pagead|baidu\.com|bdstatic\.com|cnzz\.com|umeng\.com|51\.la|51yes\.com|popads\.net|popcash\.net|exoclick\.com|juicyads\.com|trafficjunky\.net|histats\.com|statcounter\.com)\/.* url reject-dict

[mitm]
hostname = 911bl.com
```

## 说明

- `911bl-adclean.conf`：Quantumult X 重写入口。
- `911bl-adclean.js`：只对 911bl 的 HTML 页面做正文清理，删除广告容器、弹窗、浮动广告、统计脚本，并注入隐藏 CSS。
- 已避免匹配 js/css/图片/字体/视频等静态资源，防止规则过宽导致网页无法加载。
- 本机访问 911bl.com 被对端重置，无法直接抓完整页面资源；如手机端仍有残留广告，请发截图或抓包域名继续补规则。

# 911bl Quantumult X 去广告规则

## 现状

本仓库当前默认重写订阅采用保守版本：不劫持 `911bl.com` HTML 响应体，避免网页无法加载。

## 订阅

重写订阅：

```text
https://raw.githubusercontent.com/eleven252412/qx-911bl-adclean/main/911bl-adclean.conf
```

Filter 规则订阅：

```text
https://raw.githubusercontent.com/eleven252412/qx-911bl-adclean/main/911bl-adclean-filter.list
```

## 文件

- `911bl-adclean.conf`：当前为保守 no-op 重写，避免影响网页加载。
- `911bl-adclean-filter.list`：不 MITM，只拦截常见第三方广告/统计域名。
- `911bl-adclean.js`：响应体清理脚本，因手机端反馈会导致页面无法加载，默认不再启用。

## 说明

当前机器访问 `911bl.com` TLS 握手被对端重置，无法在本机真实打开网页做端到端验证。未验证前不再推送会劫持主站 HTML 的规则。

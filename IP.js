/*
 * Quantumult X Geo Location Checker
 * API: http://ip-api.com/json/?lang=zh-CN
 *
 * Config:
 * geo_location_checker=http://ip-api.com/json/?lang=zh-CN, https://raw.githubusercontent.com/Su-cyber-art/QuantumultX-Scripts/main/IP.js
 */

function finish(payload) {
  $done({
    title: payload.title || "未知位置",
    subtitle: payload.subtitle || "",
    ip: payload.ip || "",
    description: payload.description || ""
  });
}

try {
  if (typeof $response === "undefined" || !$response) {
    finish({
      title: "查询失败",
      subtitle: "Quantumult X 未提供响应内容",
      description: "请检查 geo_location_checker 的 API 地址是否可访问"
    });
  }

  if ($response.statusCode !== 200) {
    finish({
      title: "查询失败",
      subtitle: `HTTP ${$response.statusCode}`,
      description: "IP API 返回了异常状态码"
    });
  }

  const data = JSON.parse($response.body || "{}");

  if (data.status && data.status !== "success") {
    finish({
      title: "查询失败",
      subtitle: data.message || "接口返回失败",
      ip: data.query || "",
      description: JSON.stringify(data, null, 2)
    });
  }

  const ip = data.query || "";
  const country = data.country || "未知国家";
  const city = data.city || "未知城市";
  const isp = data.isp || "未知运营商";
  const org = data.org || "";

  const title = country;
  const subtitle = `${city} ${isp}`.trim();

  const description = [
    `国家：${country}`,
    `城市：${city}`,
    `运营商：${isp}`,
    `数据中心：${org}`
  ].filter(Boolean).join("\n");

  finish({ title, subtitle, ip, description });
} catch (error) {
  finish({
    title: "解析失败",
    subtitle: error && error.message ? error.message : String(error),
    description: "请检查接口返回内容是否为 JSON"
  });
}

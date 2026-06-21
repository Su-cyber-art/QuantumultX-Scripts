function flagEmoji(countryCode) {
  if (!countryCode || countryCode.length != 2) return "";
  return String.fromCodePoint(...countryCode.toUpperCase().split("").map(c => 127397 + c.charCodeAt()));
}

if ($response.statusCode != 200) {
  $done(Null);
}

var body = $response.body;
var obj = JSON.parse(body);
var flag = flagEmoji(obj['countryCode']);
var country = (flag ? flag + ' ' : '') + obj['country'];
var title = country;
var subtitle = obj['city'] + ' ' + obj['isp'];
var ip = obj['query'];
var description = "国家" + ":" + country + '\n' + "城市" + ":" + obj['city'] + '\n' + "运营商" + ":" + obj['isp'] + '\n' + "数据中心" + ":" + obj['org'];


$done({title, subtitle, ip, description});

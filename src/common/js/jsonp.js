import originJSONP from 'jsonp'

// url为服务端地址，data为拼接到url上的查询参数，option为原jsonp方法所需参数
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url,option,(err,data) => {
      if(!err){
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    // 如果值为undefined传入空否则传入值
    let value = data[k] !== undefined ? data[k] : ''
    url += '&${k}=${encodeURIComponent(value)}'
  }
  return url ? url.substring(1) : ''
}

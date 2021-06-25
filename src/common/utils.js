export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt){
  //获取年份
  //y+ -> 1个或多个y
  //y* -> 1个或多个y
  //y? -> 0个或1个y
  //i 不区分(ignore)大小写； 
  //g 全局(global)匹配 
  //如果不带g，正则过程中字符串从左到右匹配，找到第一个符合条件的即匹配成功，返回
  //如果带g，则字符串从左到右，找到每个符合条件的都记录下来，知道字符串结尾位置
  //test() 方法用于检测一个字符串是否匹配某个模式.如果字符串中有匹配的值返回 true ，否则返回 false
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+':date.getMonth() + 1,
    'd+':date.getDate() + 1,
    'h+':date.getHours() + 1,
    'm+':date.getMinutes() + 1,
    's+':date.getSeconds() + 1
  }
  for (let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str){
  return ('00' + str).substr(str.length)
}

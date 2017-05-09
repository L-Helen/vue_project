 // 解析 url参数
 // @example ?id=123&a=b @return Objict {id:123,a=b}
export function urlParse () {
  let url = window.location.search // 拿到类似 ?id=123&a=b
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['？id=123','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  // console.log(obj)
  // console.log(obj.id)
  return obj
}

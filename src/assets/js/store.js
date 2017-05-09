/**
 * Created by yi on 2016-12-28.
 */
// 存储到loacalStorage 可存储不同的id
export function saveToLocal (id, key, value) {
  let seller = window.localStorage._seller_
  if (!seller) { // 如果没有seller
    seller = {} // 新建对象
    seller[id] = {}
  } else {
    seller = JSON.parse(seller) //
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage._seller_ = JSON.stringify(seller)
}

// 读取loacalStorage的id数据  def是默认变量，读取不到时返回def
export function loadFromlLocal (id, key, def) {
  let seller = window.localStorage._seller_
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}

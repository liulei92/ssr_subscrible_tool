/**
 * 入口文件
 */

/**
 * 开发依赖
 */
let path = require('path')
let util = require('./util')
let base64 = util.base64
let readSync = util.readSync
let writeSync = util.writeSync

let BUILD_DIR = 'dist' // 构建目录
let ENTRY_FILE = './node.txt' // SS(R)入口
let str = readSync(ENTRY_FILE)

// 符合 ssr 的 修改group 或者 添加group
let reducer = (total = '', item, index, arr) => {
  if (item.startsWith('ss')) {
    let arr = item.split('//')
    arr[1] = base64.decode(arr[1])

    if (arr[1].includes('group=')) {
      let _arr = arr[1].split('/?')
      let params = _arr[1].split('&')
      arr[1] = _arr[0] + '/?' + params.map(el => {
        if (el.includes('group=')) {
          el = 'group=' + base64.encode('pingm组')
        }
        return el
      }).join('&')
    } else {
      arr[1] += '&group=' + base64.encode('pingm组')
    }
    arr[1] = base64.encode(arr[1])
    return total + (total === '' ? '' : ',') + arr.join('//')
  } else {
    return total
  }
}

// Map all the item include `ssr://` and serialize those items
let result = str.split('\n')
                .reduce(reducer, '')
                .replace(/\,/g, '\r\n')

writeSync(path.resolve(__dirname, BUILD_DIR, 'index.html'), base64.encode(result))
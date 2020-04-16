/**
 * 入口文件
 */

/**
 * 开发依赖
 */
const fs = require('fs');
const path = require('path')
const util = require('./util')
const base64 = util.base64
const readSync = util.readSync
const writeSync = util.writeSync

const BUILD_DIR = 'dist' // 构建目录
const SSR_FILE = './ssr.txt' // ssr 入口
const VMESS_FILE = './vmess.txt' // 
const ssr = readSync(SSR_FILE)
const vmess = readSync(VMESS_FILE)

// 符合 ssr 的 修改group 或者 添加group
const ssrReducer = (total = '', item, index, arr) => {
  if (item.startsWith('ss')) {
    let arr = item.split('//')
    arr[1] = base64.decode(arr[1])

    if (arr[1].includes('group=')) {
      const _arr = arr[1].split('/?')
      const params = _arr[1].split('&')
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

// 处理 vmess
const vmessReducer = (total = '', item, index, arr) => {
  if (item.startsWith('vmess')) {
    return total  + (total === '' ? '' : ',') + item
  } else {
    return total
  }
}

const readFiles = (filePath, fileType) => {
  // 根据文件路径读取文件，返回文件列表
  fs.readdir(path.resolve(filePath), (err, files) => {
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      files.forEach(filename => {
        console.log(filename);
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, (eror, stats) => {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            const isFile = stats.isFile(); // 是文件
            // const isDir = stats.isDirectory(); // 是文件夹
            if (isFile) {
              console.log(filedir);
              // 读取文件内容
              let content = readSync(filedir);
              console.log(content);
              if (fileType === 'ssr') {
                content = content.split('\n')
                .reduce(ssrReducer, '')
                .replace(/\,/g, '\r\n')
              } else if (fileType === 'v2mess') {
                content = content.split('\n')
                .reduce(vmessReducer, '')
                .replace(/\,/g, '\r\n')
              }
              writeSync(path.resolve(__dirname, BUILD_DIR + '/' + fileType, filename), base64.encode(content))
            }
            // if (isDir) {
            //   fileDisplay(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            // }
          }
        })
      });
    }
  })
}

readFiles('./ssr', 'ssr')
readFiles('./vmess', 'vmess')

// Map all the item include `ssr://` and serialize those items
const ssrResult = ssr.split('\n')
                .reduce(ssrReducer, '')
                .replace(/\,/g, '\r\n')

const vmessResult = vmess.split('\n')
                .reduce(vmessReducer, '')
                .replace(/\,/g, '\r\n')

writeSync(path.resolve(__dirname, BUILD_DIR, 'ssr.txt'), base64.encode(ssrResult))
writeSync(path.resolve(__dirname, BUILD_DIR, 'vmess.txt'), base64.encode(vmessResult))
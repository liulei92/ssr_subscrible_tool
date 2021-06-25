/**
 * 入口文件
 */

/**
 * 开发依赖
 */
const fs = require('fs');
const path = require('path');
const util = require('./util');
const base64 = util.base64;
const readSync = util.readSync;
const writeSync = util.writeSync;

const BUILD_DIR = 'dist'; // 构建目录
const SSR_FILE = './ssr.txt'; // ssr 入口
const VMESS_FILE = './vmess.txt'; //
const ssr = readSync(SSR_FILE);
const vmess = readSync(VMESS_FILE);

// 符合 ssr 的 修改group 或者 添加group
const ssrReducer = (total = '', item, index, arr) => {
  if (item.startsWith('ss')) {
    let arr = item.split('//');
    arr[1] = base64.decode(arr[1]);

    if (arr[1].includes('group=')) {
      const _arr = arr[1].split('/?');
      const params = _arr[1].split('&');
      arr[1] =
        _arr[0] +
        '/?' +
        params
          .map((el) => {
            if (el.includes('group=')) {
              el = 'group=' + base64.encode('pingm组');
            }
            return el;
          })
          .join('&');
    } else {
      arr[1] += '&group=' + base64.encode('pingm组');
    }
    arr[1] = base64.encode(arr[1]);
    return total + (total === '' ? '' : ',') + arr.join('//');
  } else {
    return total;
  }
};

// 处理 vmess
const vmessReducer = (total = '', item, index, arr) => {
  if (item.startsWith('vmess')) {
    return total + (total === '' ? '' : ',') + item;
  } else {
    return total;
  }
};

const readFiles = (filePath, fileType) => {
  // 根据文件路径读取文件，返回文件列表
  fs.readdir(path.resolve(filePath), (err, files) => {
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      files.forEach((filename) => {
        // console.log(filename);
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, (eror, stats) => {
          if (eror) {
            // console.warn('获取文件stats失败');
          } else {
            const isFile = stats.isFile(); // 是文件
            // const isDir = stats.isDirectory(); // 是文件夹
            if (isFile) {
              // console.log(filedir);
              // 读取文件内容
              let content = readSync(filedir);
              // console.log(content);
              if (fileType === 'ssr') {
                content = content
                  .split('\n')
                  .reduce(ssrReducer, '')
                  .replace(/\,/g, '\r\n');
              } else if (fileType === 'v2mess') {
                content = content
                  .split('\n')
                  .reduce(vmessReducer, '')
                  .replace(/\,/g, '\r\n');
              }
              writeSync(
                path.resolve(__dirname, BUILD_DIR + '/' + fileType, filename),
                base64.encode(content),
              );
            }
            // if (isDir) {
            //   fileDisplay(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            // }
          }
        });
      });
    }
  });
};

readFiles('./ssr', 'ssr');
readFiles('./vmess', 'vmess');

// Map all the item include `ssr://` and serialize those items
const ssrResult = ssr.split('\n').reduce(ssrReducer, '').replace(/\,/g, '\r\n');

const vmessResult = vmess
  .split('\n')
  .reduce(vmessReducer, '')
  .replace(/\,/g, '\r\n');

// 20210625 fast pjj
const template = [
  {
    name: '【FASTQ_A】HK/香港_1',
    server: 'a1.ap.fastqvpn.com',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': false,
  },
  {
    name: '【FASTQ_A】HK/香港_2',
    server: 'a2.ap.fastqvpn.com',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': false,
  },
  {
    name: '【FASTQ_A】HK/香港_3',
    server: 'a3.ap.fastqvpn.com',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': false,
  },
  {
    name: '【FASTQ_A】HK/香港_4',
    server: 'a4.ap.fastqvpn.com',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': false,
  },
  {
    name: '【FASTQ_A】HK/香港_5',
    server: 'a5.ap.fastqvpn.com',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': false,
  },
  {
    name: '【FASTQ_G】HK/香港',
    server: 'global.ap.fastqvpn.com',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_G】AU/澳大利亚',
    server: 'global.ap.fastqvpn.com',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_G】CA/加拿大',
    server: 'global.ap.fastqvpn.com',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_G】DE/德国',
    server: 'global.ap.fastqvpn.com',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_G】JP/日本',
    server: 'global.ap.fastqvpn.com',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_G】SG/新加坡',
    server: 'global.ap.fastqvpn.com',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_G】UK/英国',
    server: 'global.ap.fastqvpn.com',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_G】US/美国',
    server: 'global.ap.fastqvpn.com',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】HK/香港',
    server: 'tx.wy.fastqvpn.com',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】AU/澳大利亚',
    server: 'tx.wy.fastqvpn.com',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】CA/加拿大',
    server: 'tx.wy.fastqvpn.com',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】DE/德国',
    server: 'tx.wy.fastqvpn.com',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】JP/日本',
    server: 'tx.wy.fastqvpn.com',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】SG/新加坡',
    server: 'tx.wy.fastqvpn.com',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】UK/英国',
    server: 'tx.wy.fastqvpn.com',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【FASTQ_W】US/美国',
    server: 'tx.wy.fastqvpn.com',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】HK/香港',
    server: 'a1.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】AU/澳大利亚',
    server: 'a1.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】CA/加拿大',
    server: 'a1.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】DE/德国',
    server: 'a1.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】JP/日本',
    server: 'a1.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】SG/新加坡',
    server: 'a1.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】UK/英国',
    server: 'a1.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_A】US/美国',
    server: 'a1.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】HK/香港',
    server: 'ap1-ge.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】AU/澳大利亚',
    server: 'ap1-ge.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】CA/加拿大',
    server: 'ap1-ge.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】DE/德国',
    server: 'ap1-ge.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】JP/日本',
    server: 'ap1-ge.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】SG/新加坡',
    server: 'ap1-ge.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】UK/英国',
    server: 'ap1-ge.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_GE】US/美国',
    server: 'ap1-ge.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_1',
    server: 'ap1-jp.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_2',
    server: 'ap1-jp.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_3',
    server: 'ap1-jp.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_4',
    server: 'ap1-jp.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_5',
    server: 'ap1-jp.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_6',
    server: 'ap1-jp.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_7',
    server: 'ap1-jp.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_JP】JP/日本_8',
    server: 'ap1-jp.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_1',
    server: 'ap1-sg.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_2',
    server: 'ap1-sg.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_3',
    server: 'ap1-sg.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_4',
    server: 'ap1-sg.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_5',
    server: 'ap1-sg.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_6',
    server: 'ap1-sg.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_7',
    server: 'ap1-sg.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_SG】SG/新加坡_8',
    server: 'ap1-sg.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_1',
    server: 'ap1-au.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_2',
    server: 'ap1-au.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_3',
    server: 'ap1-au.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_4',
    server: 'ap1-au.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_5',
    server: 'ap1-au.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_6',
    server: 'ap1-au.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_7',
    server: 'ap1-au.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_AU】AU/澳大利亚_8',
    server: 'ap1-au.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_1',
    server: 'ap1-ca.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_2',
    server: 'ap1-ca.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_3',
    server: 'ap1-ca.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_4',
    server: 'ap1-ca.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_5',
    server: 'ap1-ca.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_6',
    server: 'ap1-ca.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_7',
    server: 'ap1-ca.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_CA】CA/加拿大_8',
    server: 'ap1-ca.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_1',
    server: 'ap1-uk.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_2',
    server: 'ap1-uk.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_3',
    server: 'ap1-uk.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_4',
    server: 'ap1-uk.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_5',
    server: 'ap1-uk.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_6',
    server: 'ap1-uk.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_7',
    server: 'ap1-uk.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_UK】UK/英国_8',
    server: 'ap1-uk.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_1',
    server: 'ap1-us.er3.xyz',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_2',
    server: 'ap1-us.er3.xyz',
    port: 29982,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_3',
    server: 'ap1-us.er3.xyz',
    port: 29983,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_4',
    server: 'ap1-us.er3.xyz',
    port: 29984,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_5',
    server: 'ap1-us.er3.xyz',
    port: 29985,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_6',
    server: 'ap1-us.er3.xyz',
    port: 29986,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_7',
    server: 'ap1-us.er3.xyz',
    port: 29987,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: '【ER3_US】US/美国_8',
    server: 'ap1-us.er3.xyz',
    port: 29988,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'TW/台湾◆PJJ1',
    server: 'tw01.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'TW/台湾◆PJJ2',
    server: 'tw02.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'TW/台湾◆PJJ3',
    server: 'tw03.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'TW/台湾◆PJJ4',
    server: 'tw04.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'KR/韩国◆PJJ1',
    server: 'sk03.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'KR/韩国◆PJJ2',
    server: 'sk04.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'SG/新加坡◆PJJ1',
    server: 'sg01.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'SG/新加坡◆PJJ2',
    server: 'sg02.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'SG/新加坡◆PJJ3',
    server: 'sg03.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'SG/新加坡◆PJJ4',
    server: 'sg04.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'HK/香港◆PJJ1',
    server: 'hk01.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'HK/香港◆PJJ2',
    server: 'hk02.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'HK/香港◆PJJ3',
    server: 'hk03.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
  {
    name: 'HK/香港◆PJJ4',
    server: 'hk04.pjj.life',
    port: 29980,
    username: 435080826590330880,
    password: 'd09ce772-81b9-4409-bb3f-ebee33e2cc0b',
    type: 'http',
    tls: true,
    'skip-cert-verify': true,
  },
];
// http://120.53.232.245/yjl s:3c59998bcde0479cac5fe80f5c80ec3f c:W8FUBK
const [username, password] = [
  459393681460297728,
  'a3dacec0-65b6-45db-ad49-5b923dc617ee',
];
function fastqExcute() {
  return template
    .map((item) => {
      const str = `${username}:${password}@${item.server}:${item.port}`;
      return `https://${base64.encode(str)}?cert=&peer=#${item.name}`;
    })
    .join('\r\n');
}
const fastqResult = fastqExcute();

writeSync(
  path.resolve(__dirname, BUILD_DIR, 'ssr.txt'),
  base64.encode(ssrResult),
);
writeSync(
  path.resolve(__dirname, BUILD_DIR, 'vmess.txt'),
  base64.encode(vmessResult),
);
writeSync(
  path.resolve(__dirname, BUILD_DIR, 'fastq_https.txt'),
  base64.encode(fastqResult),
);

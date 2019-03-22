const fs = require('fs');
const path = require('path');

const getEntryJs = (jspath) => {
  const fileList = {};
  const getJSFileRecursion = (pathNode) => {
    const dirList = fs.readdirSync(pathNode);
    dirList.forEach((jsFile) => {
      if (fs.statSync(`${pathNode}/${jsFile}`).isDirectory()) {
        // getJSFileRecursion(`${pathNode}/${jsFile}`);
      } else if (path.extname(jsFile) === '.js') {
        // 获取到js，开始组织数据结构
        fileList[path.basename(jsFile, '.js')] = [`${pathNode}/${jsFile}`];
      }
    });
  };
  getJSFileRecursion(jspath);
  return fileList;
};

module.exports = getEntryJs('./src/js');

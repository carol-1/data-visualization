//读取文件的工具方法
const fs = require('fs')
module.exports.getFileJsonData = (filePath) => {
    return new Promise((resolve, reject) => {
        //根据文件路径读取文件内容
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                //读取失败
                reject(error)
            } else {
                //读取成功
                resolve(data)
            }
        })
    })
}
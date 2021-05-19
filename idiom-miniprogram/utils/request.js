/**
 * 接口请求封装的工具类
 * 
 */
export default(url,data={},method='GET')=>{
   return new Promise(
      (resolve,reject)=>{
        wx.request({
          url,
          data,
          method,
          success:(res)=>{
            console.log('请求接口成功')
            resolve(res.data)
          },
          fail:(err)=>{
            console.log('请求接口失败')
            reject(err)
          }
        })
      }
   )
}
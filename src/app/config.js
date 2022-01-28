const fs=require('fs')
const dotenv=require('dotenv')
dotenv.config()// 这个库会将.env中的所有配置信息封装成一个env对象放到全局对象process上
const PRIVATE_KEY=fs.readFileSync('./src/app/keys/private.key')
const PUBLIC_KEY=fs.readFileSync('./src/app/keys/public.key')
module.exports={
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  APP_HOST
}=process.env
module.exports.PRIVATE_KEY=PRIVATE_KEY
module.exports.PUBLIC_KEY=PUBLIC_KEY
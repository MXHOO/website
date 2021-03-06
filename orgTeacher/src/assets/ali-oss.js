import crypto from 'crypto-js'
let OSS = require('ali-oss')
let Base64 = require('js-base64').Base64
const accessid = 'xxx'
const accesskey = 'xxx'
const host = 'xxx'
var policyText = {
  'expiration': '2020-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
  'conditions': [
    ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制
  ]
}
var policyBase64 = Base64.encode(JSON.stringify(policyText))
var message = policyBase64
var bytes = crypto.HmacSHA1(message, accesskey)
var signature = bytes.toString(crypto.enc.Base64)
const timestamp = Date.parse(new Date()) / 1000
var now = timestamp
export function client () {
  return new OSS({
    accessKeyId: 'xxx',
    accessKeySecret: 'xxx',
    region: 'oss-cn-beijing', // oss地区
    bucket: 'xxx'
  })
}

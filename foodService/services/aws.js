const unggah = require('unggah')
require("dotenv").config();
// AWS.config.update({
//   accessKeyId:process.env.AWS_KEY_ID,
//   secretAccessKey:process.env.AWS_SECRET_KEY,
//   region: 'ap-southeast-1'
// })
const storage = unggah.s3({
  endpoint: 's3.ap-southeast-1.amazonaws.com',
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  bucketName: 'ingredientimages',
  rename: (req, file) => {
    /* istanbul ignore next */
    return `${Date.now()}-${file.originalname}`  // this is the default
  }
})
// const s3Bucket = new AWS.S3( { params: {Bucket: 'ingredientimages'} } )

const upload = unggah({
  storage: storage
})
// function uploadImage(name,imageBase64,cb){
//   buf = new Buffer(imageBase64.replace(/^data:image\/\w+;base64,/, ""),'base64')

//   var data = {
//     Key: name, 
//     Body: buf,
//     ContentEncoding: 'base64',
//     ContentType: 'image/jpeg'
//   };
//   return s3Bucket.putObject(data,cb);
// }

module.exports = upload
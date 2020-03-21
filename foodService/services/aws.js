const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId:"AKIAINC64PXWMIXNY43Q",
  secretAccessKey:"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",
  region: 'ap-southeast-1'
})
const s3Bucket = new AWS.S3( { params: {Bucket: 'ingredientimages'} } )

function uploadImage(name,imageBase64,cb){
  buf = new Buffer(imageBase64.replace(/^data:image\/\w+;base64,/, ""),'base64')

  var data = {
    Key: name, 
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };
  return s3Bucket.putObject(data,cb);
}

module.exports = uploadImage
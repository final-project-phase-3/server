const AWS = require('aws-sdk')
AWS.config.update({
  
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
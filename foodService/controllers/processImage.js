const awsUpload = require("../services/aws")
const axios = require("axios")
class ProcessImageController {
  static uploadImage(req,res,next){
    const { id, imageBase64} = req.body

    if(!id || !imageBase64){
      const err = {
        status:400,
        message:"id/base64 missing"
      }
      next(err)
    }

    awsUpload(id,imageBase64,(err,data) => {
      if(err){
        next(err)
      }

      const payload = {
        imageUrl:""
      }

      res.json(payload)
    })  
  }

  static  ocrImage(req,res,next){
    const { imageUrl } = req.body
    console.log(imageUrl)
    if(!imageUrl){
      const err = {
        status:400,
        message:"imageUrl missing"
      }
      next(err)
    }

    const auth = {
      auth:{
        username: "acc_0b1784b7862046a",
        password: "1285192b2b68ff9429c3495f4f3dc4c7"
      }
    }

    const url = 'https://api.imagga.com/v2/tags?image_url='+encodeURIComponent(imageUrl)
    axios
      .get(url,auth)
      .then(({ data }) => {
        if(data.status.type === 'success'){
          res.json(data.result.tags)
        }else{
          const err = {
            status:400,
            message:"can't read your image"
          }
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProcessImageController
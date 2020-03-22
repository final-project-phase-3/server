const axios = require("axios")

class ProcessImageController {
  static async uploadImage(req,res,next){
    
    res.status(200).json({imageUrl:req.body.image})
  }

  static  ocrImage(req,res,next){
    const { imageUrl } = req.body
    
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

    const url = 'https://api.imagga.com/v2/tags?verbose=1&&limit=1&&image_url='+encodeURIComponent(imageUrl)
    axios
      .get(url,auth)
      .then(({ data }) => {
        if((data.status.type === 'success' || data.results.tags === 0)){
          res.status(200).json({name: data.result.tags[0].tag.en})
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
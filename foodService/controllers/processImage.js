const awsUpload = require("../services/aws")
const axios = require("axios")
const User = require("../models/User")
const mongoose = require('mongoose');
class ProcessImageController {
  static async uploadImage(req,res,next){
    const id = req.payload.id
    const { imageBase64} = req.body
    try {
      const response = await User.findById(id)
      const total = response.refrigerator.length + 1
      if(!imageBase64){
        const err = {
          status:400,
          message:"id/base64 missing"
        }
        next(err)
      }
  
      awsUpload(`${id}-${total}`,imageBase64,(err,data) => {
        if(err){
          next(err)
        }
  
        const payload = {
          imageUrl:`https://ingredientimages.s3-ap-southeast-1.amazonaws.com/${id}-${total}`
        }
  
        res.status(200).json(payload)
      })  
    } catch (error) {
      next(error)
    }
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

    const url = 'https://api.imagga.com/v2/tags?limit=1&&image_url='+encodeURIComponent(imageUrl)
    axios
      .get(url,auth)
      .then(({ data }) => {
        if(data.status.type === 'success' || data.results.tags === 0){
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
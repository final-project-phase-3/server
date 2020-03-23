const axios = require("axios")
const textApi = require('../services/aylien')
class ProcessImageController {
  static async uploadImage(req,res,next){
    
    res.status(200).json({imageUrl:req.body.image})
  }

  static  ocrImage(req,res,next){

    const { imageUrl } = req.body
    console.log(imageUrl,"aaaaaaaa")
    if(!imageUrl){
      const err = {
        status:400,
        message:"imageUrl missing"
      }
      next(err)
    }
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/')+1);
    const sharpenImage = `https://coolkas.imgix.net/${fileName}?sharp=100?dpr=0.5`

    const auth = {
      auth:{
        username: "acc_0b1784b7862046a",
        password: "1285192b2b68ff9429c3495f4f3dc4c7"
      }
    }

    const url = 'https://api.imagga.com/v2/tags?limit=5&&image_url='+encodeURIComponent(sharpenImage)
    axios
      .get(url,auth)
      .then(({ data }) => {
        let arrayTag = []
        console.log(data)
        for (let i = 0; i < data.result.tags.length;i++){
          arrayTag.push(data.result.tags[i].tag.en)
        }
        textApi.concepts({
          text:String(arrayTag),
          language:"en"
        },(error,response) => {
          console.log(arrayTag)
          if (error === null) {
            let arrayKey = Object.keys(response.concepts)
            let concept = arrayKey[0]
            let surfaceForms = response.concepts[concept].surfaceForms.map(function(sf) {
              return sf['string'];
            });
            textApi.hashtags({
              text:String(arrayTag),
              language:"en"
            },((err,resp) => {
              let tags = resp.hashtags.map(sf => {
                return sf.slice(1)
              })
              res.status(200).json({
                imageUrl,
                concept: concept.substring(concept.lastIndexOf('/')+1),
                name: surfaceForms[0],
                tags: tags,
                msg: "Success"
              })
            }))
          }else {
            const error = {
              status:400,
              message:"can't read your image"
            }
            next(error)
          }
        })
        // if((data.status.type === 'success' || data.result.tags.length === 0)){
          //   res.json(data.result.tags)
        //   // res.status(200).json({name: data.result.tags[0].tag.en})
        // }else{
          // }
        })
        .catch(err => {
          const error = {
            status:400,
            message:"can't read your image"
          }
          next(error)
      })
  }
}

module.exports = ProcessImageController
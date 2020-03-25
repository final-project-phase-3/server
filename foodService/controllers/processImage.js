const axios = require("axios")
const textApi = require('../services/aylien')
const qs = require('qs')
/* istanbul ignore next */
class ProcessImageController {
  static async uploadImage(req,res,next){
    
    res.status(200).json({imageUrl:req.body.image})
  }

  static  ocrImage(req,res,next){

    const { imageUrl } = req.body
    console.log(imageUrl,"aaaaaaaa")
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/')+1);
    if(!imageUrl){
      const err = {
        status:400,
        message:"imageUrl missing"
      }
      next(err)
    }
    const sharpenImage = `https://coolkas.imgix.net/${fileName}?sharp=100&sat=-100&con=30`

    const auth = {
      auth:{
        username: "acc_0b1784b7862046a",
        password: "1285192b2b68ff9429c3495f4f3dc4c7"
      }
    }

    const url = 'https://api.imagga.com/v2/tags?limit=3&&image_url='+encodeURIComponent(sharpenImage)
    axios
      .get(url,auth)
      .then(({ data }) => {
        let arrayTag = []
        console.log(data)
        for (let i = 0; i < data.result.tags.length;i++){
          arrayTag.push(data.result.tags[i].tag.en)
        }
        if(arrayTag.length === 0){
          const err = {
            status:400,
            message:"imageUrl missing"
          }
          next(err)
        }

        res.status(200).json({
          imageUrl,
          // concept: concept.substring(concept.lastIndexOf('/')+1),
          name: arrayTag[0] || '',
          tags:arrayTag,
          msg: "Success"
        })
        // textApi.concepts({
        //   text:String(arrayTag),
        //   language:"en"
        // },async (error,response) => {
        //   console.log(arrayTag)
        //   if (error === null) {
        //     let arrayKey = Object.keys(response.concepts)
        //     console.log(arrayKey)
        //     let arrayResult = []
        //     for(let i = 0 ; i < arrayKey.length; i++){
        //       console.log(response.concepts[arrayKey[i]] )
        //       arrayResult = arrayResult.concat(response.concepts[arrayKey[i]].surfaceForms)
        //     }
           
        //     // arrayResult.sort((a,b) => {
        //     //   return b.score - a.score
        //     // });
        //     // let tags = []
        //     // arrayResult.forEach(val => {
        //     //   tags.push(val.string)
        //     // })
        //     // console.log(arrayResult)
        //     // try {
              
        //     //   console.log(tags)
        //     //   const razorResult = await axios(
        //     //     {
        //     //       url:"http://api.textrazor.com",
        //     //       method:"GET",
        //     //       headers:{
        //     //         'Content-Type': 'application/x-www-form-urlencoded',
        //     //         'X-TextRazor-Key': process.env.RAZOR_KEY
        //     //       },
        //     //       data:qs.stringify({
        //     //         text: arrayTag.join(" "),
        //     //         extractors:"entities",
        //     //         languageOverride:"eng"
        //     //       })
        //     //     }
        //     //   )
        //     //   const razorTemp = razorResult.data.response.entities || []
        //     //   console.log(razorResult.data,"bbudi")
        //     //   let newtags = []
        //     //   razorTemp.forEach(el => {
        //     //     newtags.push(el.matchedText)
        //     //   })
        //     // } catch (error) {
        //     //     console.log(error)
        //     // }

           
        //     // textApi.hashtags({
        //     //   text:String(arrayTag),
        //     //   language:"en"
        //     // },((err,resp) => {
        //     //   let tags = resp.hashtags.map(sf => {
        //     //     return sf.slice(1)
        //     //   })
              
        //     // }))
        //   }else {
        //     const error = {
        //       status:400,
        //       message:"can't read your image"
        //     }
        //     next(error)
        //   }
        // })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProcessImageController
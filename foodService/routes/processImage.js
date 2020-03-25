const routes = require("express").Router()
const processImage = require("../controllers/processImage")
const authentication = require("../middlewares/authentication")
const upload = require("../services/aws")
routes.use(authentication)
routes.post('/',upload.single('image'),processImage.uploadImage)
routes.get('/',processImage.ocrImage)

module.exports = routes;

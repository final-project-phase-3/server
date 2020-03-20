const routes = require("express").Router()
const processImage = require("../controllers/processImage")
const authentication = require("../middlewares/authentication")

routes.use(authentication)
routes.post('/',processImage.uploadImage)
routes.get('/',processImage.ocrImage)

module.exports = routes;

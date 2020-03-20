const routes = require("express").Router();
const processImage = require("../controllers/processImage")

routes.post('/',processImage.uploadImage)
routes.get('/',processImage.ocrImage)

module.exports = routes;

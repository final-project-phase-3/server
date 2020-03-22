const AYLIENTextAPI = require('aylien_textapi')
const textapi = new AYLIENTextAPI({
  application_id: process.env.NEWSAPI_APP_ID,
  application_key: process.env.NEWSAPI_APP_KEY
});

module.exports = textapi
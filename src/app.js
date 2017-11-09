const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')
const path = require('path')
const route = require('./helper/route')


const sercer = http.createServer((req, res) => {
    const clientUrl = req.url
    const filePath = path.join(conf.root, clientUrl)
    route(req,res,filePath)
    
}).listen(conf.post, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.post}`
    console.log(`Server started at ${chalk.green(addr)}`)
})
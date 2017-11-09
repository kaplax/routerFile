const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const conf = require('../config/defaultConfig');
const mimeType = require( './mime' );
const compress = require( './compress' )
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            let contentType = mimeType(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', `${contentType};charset=utf-8`);
            let rs = fs.createReadStream(filePath);
            if( filePath.match( conf.compress ) ){
                rs = compress( rs,req,res );
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            let dirPath = path.relative(conf.root, filePath) ? '../'+path.relative(conf.root, filePath) : '', 
                title = path.basename(filePath),dir="";
            files.map((items, index) => {
                dir += `<a href="${dirPath}/${items}">${items}</a></br>`
            })
            const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${title}</title>
            </head>
            <body>
                ${dir}
            </body>
            </html>`
            res.end(html);
        }

    } catch (ex) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end(filePath + ' is not a directory or file')
        return;
    }
}
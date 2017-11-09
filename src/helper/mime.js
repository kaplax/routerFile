const path = require('path');
const mime = {
    'doc': 'application/msword',
    'docx': 'application/vndopenxmlformats-officedocumentwordprocessingmldocument',
    'rtf': 'application/rtf',
    'xls': 'application/vndms-excel	application/x-excel',
    'xlsx': 'application/vndopenxmlformats-officedocumentspreadsheetmlsheet',
    'ppt': 'application/vndms-powerpoint',
    'pptx': 'application/vndopenxmlformats-officedocumentpresentationmlpresentation',
    'pps': 'application/vndms-powerpoint',
    'ppsx': 'application/vndopenxmlformats-officedocumentpresentationmlslideshow',
    'pdf': 'application/pdf',
    'swf': 'application/x-shockwave-flash',
    'dll': 'application/x-msdownload',
    'exe': 'application/octet-stream',
    'msi': 'application/octet-stream',
    'chm': 'application/octet-stream',
    'cab': 'application/octet-stream',
    'ocx': 'application/octet-stream',
    'rar': 'application/octet-stream',
    'tar': 'application/x-tar',
    'tgz': 'application/x-compressed',
    'zip': 'application/x-zip-compress,ed',
    'wav': 'audio/wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'video/x-ms-wmv',
    'mp3': 'audio/mpeg',
    'rm': 'application/vndrn-realmedia',
    'bmp': 'image/bmp',
    'gif': 'image/gif',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'txt': 'text/plain',
    'xml': 'text/xml',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json'
}
module.exports = (filePath) => {
    let ext = path.extname(filePath).split('.').pop().toLocaleLowerCase();
    if (!ext) {
        ext = filePath;
    }
    return mime[ext] || mime['txt']
}
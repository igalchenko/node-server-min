/**
 * DESCRIBE ME!!!
 *
 * @category    FightClub
 * @package     FightClub_ModuleName
 * @copyright   Copyright (c) 2013 http://www.speroteck.com
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

var http = require('http'),
    fs =  require('fs'),
    url = require('url'),
    path = require('path'),
    s = http.createServer(function (req, res) {
    'use strict';
    var filePath, fullPath;
    filePath = url.parse(req.url).pathname;
    if (!filePath || filePath === '/') {
        filePath = 'index.html';
    }
    fullPath = path.join(process.cwd(), filePath);
    fs.exists(fullPath, function (exists) {
        if (!exists) {
            res.writeHeader(404, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
        } else {
            fs.readFile(fullPath, 'binary', function(err, file) {
                if (err) {
                    res.writeHeader(500, {'Content-Type': 'text/plain'});
                    res.write(err + '\n');
                    res.end();
                } else {
                    res.writeHeader(200);
                    res.write(file, 'binary');
                    res.end();
                }
            });
        }
    });
});
s.listen(8125, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8125/');
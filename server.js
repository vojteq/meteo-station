const http = require("http");
const exec = require('child_process').exec;

http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    var child = exec('python /var/www/html/bme280.py');
    child.stdout.on('data', function (result) {
        response.write('<!DOCTYPE html>'
            + '<html lang="en">'
            + '<head>'
            + '<meta charset="UTF-8">'
            + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
            + '<meta name="viewport" content="width=device-width, initial-scale=                                                                                                                                                             1.0">'
            + '<title>METEO</title>'
            + '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"/>'
            + '</head>'
            + '<body>'
            + '<div class="container justify-content-sm-center">'
            + '<h1 class="py-3">STACJA METEO</h1>'
            + '<table class="table">'
            + '<thead>'
            + '<tr>'
            + '<th scope="col">TYPE</th>'
            + '<th scope="col">VALUE</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>'
        );
        var dataArray = result.split("\n");
        for (i = 2; i < dataArray.length - 1; i++) {
            var data = dataArray[i].split(":");
            response.write('<tr>'
                + '<th>' + data[0] + "</th>"
                + '<td>' + data[1] + "</td>"
                + '</tr>'
            );
        }
        response.write('</tbody>'
            + '</table>'
            + '<a href="/"><button type="button" class="btn btn-success">RELOAD DATA                                                                                                                                                             </button></a>'
            + '</div>'
            + '</body>'
            + '</html>'
        );
        response.end();
    });
}).listen(8080);
console.log("server at 8080");

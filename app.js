var connect = require('connect');
var render = require('./lib/render');

var app = connect(
  connect.static(__dirname + '/public'),
  render({
    root: __dirname + '/views',
    cache: true,
  })
);

function site(app) {
  app.get('/', function(req, res) {
    var enddate = new Date('2011-12-10 13:30');
    var diff = (enddate - new Date()) / 1000;
    var days = Math.floor(diff / 3600 / 24);
    diff -= days * 3600 * 24;
    var hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    var minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    var seconds = Math.floor(diff);
    if(days < 10) {
      days = '0' + days;
    }
    if(hours < 10) {
      hours = '0' + hours;
    }
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    if(seconds < 10) {
      seconds = '0' + seconds;
    }
    res.render('index.html', {
      layout: false,
      starttime: days + ':' + hours + ':' + minutes + ':' + seconds
    });
  });
}

app.use('/', connect.router(site));

app.listen(8080);
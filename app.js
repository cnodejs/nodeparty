var connect = require('connect');
var render = require('./lib/render');
var app = connect(
  connect.static(__dirname + '/public'),
  render({
    root: __dirname + '/views',
    cache: false,
  })
);
function site(app) {
  app.get('/', function(req, res) {
    //changed by kennyz
    res.render('index.html', {
      layout: false,
      endtime: new Date('2012-06-30 00:00:00').getTime()
    });
    
  });
}
app.use('/', connect.router(site));
app.listen(80);
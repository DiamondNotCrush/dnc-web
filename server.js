var app = require('./server/server-config.js');

app.set('port', process.env.PORT || 4568);
app.listen(app.get('port'));
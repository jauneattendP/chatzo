var express = require('express')
    , index = require('./routes/index.js')
    , admin = require('./routes/admin.js')
    , contact = require('./routes/contact.js')
    , posts = require('./routes/posts.js')
    , http = require('http')
    , path = require('path')
    , hash = require('./auth').hash
    , db = require('./models')
    , favicons = require('connect-favicons')
    , rewriter = require('express-rewrite');


var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/images/FAVICON.ico'));
    app.use(favicons(__dirname + '/public/images/apple-touch-icon.png'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(express.cookieSession({
            secret: 'SECRET',
            cookie: { access: false }
        })
    );
    app.use(rewriter);
    app.use(app.router);
    app.use(function(req, res, next){
        res.render('404.jade', {
            title: "404 - Page Not Found",
            showFullNav: false,
            status: 404,
            url: req.url
        });
    });
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', index.index);

app.get('/toto', rewriter.rewrite('/heytoto'));

db.sequelize.sync().complete(function(err) {
    if (err) {
        throw err
    } else {
        http.createServer(app).listen(app.get('port'), function(){
            console.log('Express server listening on port ' + app.get('port'))
        })
    }
});
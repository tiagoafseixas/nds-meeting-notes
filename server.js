var express = require('express')
var path = require('path')
var compression = require('compression')
var bodyParser = require('body-parser');

var app = express();

// CONFIGURE MIDDLEWARE
// =============================================================================
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
    // do logging
    console.log('#server.js -> received a request.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', (req, res) => {
    console.log('#server.js -> Serving the application.');
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// on routes that end in /minutes
// =============================================================================
router.route('/minutes')
    // Create a new minutes
    .post( (req, res) => {
        console.log('#server.js -> creating a new minute!');
        console.log(req.body);
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
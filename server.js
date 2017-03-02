var express = require('express')
var path = require('path')
var compression = require('compression')
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var Immutable = require('immutable');
var _ = require('lodash');

// INITIAL SERVER CONFIGURATION
// =============================================================================
var app = express();

var MinutesController = require('./app/controllers/Minutes');

// CONFIGURE MIDDLEWARE
// =============================================================================
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator({
 customSanitizers: {
    sanitizeMultiValue: function(value) {
        return _.compact(_.concat([], value)) || [];
    },
 }
}));
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
    .post( (req, res, next) => {
        console.log('#server.js -> creating a new minute!');

        req.checkBody('title', 'Title is required.').notEmpty();
        req.checkBody('date', 'Not a valid date format.').notEmpty()
            .withMessage('Date is Required.').isDate();
        req.checkBody('time', 'Invalid time format. Hour must be HH:MM.').notEmpty()
            .withMessage('Time is required')
            .matches(/^[\d]{2}:[\d]{2}$/);
        
        let errors = req.validationErrors();

        if (errors) {
            res.status(500).json({errors});
        } else {
            MinutesController.post(
                Immutable.Map(req.body),
                (err, result) => { (err) ? res.status(500).json({err}) : res.json(result) }
            );
        }
    })

    .get( (req, res, next) => {
        console.log('#server.js -> getting minutes!');
        MinutesController.get().then( (items) => { res.send({items}); });
    } )

    .delete( (req, res, next) => {
        console.log('#server.js -> deleting a minute!');
        req.checkBody('id', 'A valid id to delete is required.').notEmpty();
        let errors = req.validationErrors();

        if (errors) {
            res.status(500).json({errors});
        } else {
            MinutesController.delete(
                req.body.id,
                (err, result) => { (err) ? res.status(500).json({err}) : res.json(result) }
            );
        }
    } )
    ;

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
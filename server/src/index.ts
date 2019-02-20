import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';

// import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import PassportConfig from './Config/Passport';
import databaseConfig from './Config/Database';

PassportConfig(passport);

// Import Controllers
import TestController from './Controllers/Test';
import Authentication from './Controllers/Authentication';

// Mongoose
mongoose.connect(databaseConfig.database);

const app = express();                 // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors support
app.use( (_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Passport
app.use(passport.initialize());

var port = process.env.PORT || 8081;        // set our port

var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), TestController.getData );
router.post( '/signup', Authentication.SignUp );
router.post( '/signin', Authentication.SignIn );

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
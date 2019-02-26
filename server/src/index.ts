import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import AuthenticationMiddleware from "./Middleware/Authentication";
import databaseConfig from "./Config/Database";

// Import Controllers
import TestController from "./Controllers/Test";
import Authentication from "./Controllers/Authentication";
import BudgetController from './Controllers/Budgets';

// Setup ENV from .env
dotenv.config();

// Mongoose
mongoose.connect(databaseConfig.database);

const app = express(); // define our app using express

app.use(
  cors({
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  })
);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const csrfMiddleware = csurf({
  cookie: true
});

app.use( csrfMiddleware );

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // @ts-ignore
  res.cookie('XSRF-TOKEN', req.csrfToken());
  // @ts-ignore
  res.locals._csrf = req.csrfToken();
  next();
});


const port = process.env.PORT || 8081; // set our port

const router = express.Router();

router.options( '/', cors() );
router.post("/", AuthenticationMiddleware, TestController.getData);

router.options( '/signup', cors() );
router.post("/signup", Authentication.SignUp);

router.options( '/signin', cors() );
router.post("/signin", Authentication.SignIn);
// router.post("/refreshtoken", csrfMiddleware, Authentication.RefreshToken);

router.options( '/verifytoken', cors() );
router.get("/verifytoken", Authentication.VerifyToken);

router.options( '/budgets', cors() );
router.get("/budgets", AuthenticationMiddleware, BudgetController.getBudgets);
router.post("/budgets", AuthenticationMiddleware, BudgetController.addBudget);

app.use("/api", router);

app.listen(port);
// @ts-ignore
console.log("Magic happens on port " + port);
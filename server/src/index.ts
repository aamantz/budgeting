import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
import AuthenticationMiddleware from "./Middleware/Authentication";
import databaseConfig from "./Config/Database";

// Import Controllers
import TestController from "./Controllers/Test";
import Authentication from "./Controllers/Authentication";

// Mongoose
mongoose.connect(databaseConfig.database);

const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

const port = process.env.PORT || 8081; // set our port

const router = express.Router();

router.get("/", AuthenticationMiddleware, TestController.getData);
router.post("/signup", Authentication.SignUp);
router.post("/signin", Authentication.SignIn);
router.post("/refreshtoken", Authentication.RefreshToken);

app.use("/api", router);

app.listen(port);
console.log("Magic happens on port " + port);

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const engine = require("ejs-locals");
const path = require("path");
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) console.log(err);
		else console.log("Mongo Connected");
	}
);

require('./helper_function/schema_register');

//Public
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/views")));
app.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
	);
	next();
});

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: "Idea_cat",
		resave: false,
		saveUninitialized: true,
	})
);

redisClient.on("error", (err) => {
	console.log(err);
});

//body parser
app.use(bodyParser.urlencoded({ parameterLimit: 100000, extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

// view engine setup
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/idea', require('./routes/idea'));
app.use('/emp', require('./routes/epmloyee'));

const port = process.env.port || 5000;
app.listen(port, () => {
	console.log(`Running on PORT ${port}`);
});
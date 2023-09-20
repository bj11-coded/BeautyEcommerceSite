// insert different package 
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');

//instant for using express
const app = express();


//app.use(express.static(path.join('__dirname','public')))
app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/public/assets',express.static('./public/assets'));

//for using session
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '1biju',
	database: 'shopping',
	createDatabaseTable: false,
	schema: {
		tableName: 'sessions_table',
		columnNames: {
			session_id: 'custom_session_id',
			expires: 'custom_expires_column_name',
			data: 'custom_data_column_name'
		}
	}
};
 var sessionConnection = mysql.createConnection(options)

var sessionStore = new MySQLStore({session:'sessions_table'
},sessionConnection);



app.use(session({
	//name:'SessionCookie',
	secret: 'my_secrate',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	//cookie: { secure: false }
}));

app.use(flash());


const productRoute = require('./routes/productRoute')
const authRoute = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute')



app.use(authRoute);
app.use(productRoute);
app.use('/admin',adminRoute);


//app.listen()
module.exports = app;
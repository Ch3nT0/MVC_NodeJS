const express = require('express');
const path = require('path');

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const session = require('express-session');
require('dotenv').config();

const database = require("./config/database")

const systemConfig = require("./config/system");

const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')

database.connect();

const app = express()
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// cấu hình pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug')

//flash
app.use(cookieParser('JKHJHSDFGHGFH'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());


//tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// nhúng file tĩnh
app.use(express.static(`${__dirname}/public`))

// Route
route(app)
routeAdmin(app)
app.get("*",(req,res)=>{
    res.render("client/pages/errors/404",{
        pageTitle:"404 Not Found",
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
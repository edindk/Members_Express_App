const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars');
const members = require('./Members');
const recentlyAdded = require('./RecentlyAdded');
// init middleware
//app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => res.render('index', {title: 'Member app', members}));
app.get('/add', (req, res) => res.render('add', {title: 'Add member', recentlyAdded}));
app.get('/update', (req, res) => res.render('update', {title: 'Update member', members}));

/*Body Parser middleware. Middleware in order to be able to read the "body"
of incoming JSON objects.*/
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
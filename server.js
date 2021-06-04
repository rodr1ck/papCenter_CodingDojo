const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
/* const jwt = require('jsonwebtoken');*/
const cookieParser = require('cookie-parser'); 

app.use(cookieParser());

/* const secretKey = "keepThisSecret";
const payload = {
  _id: user._id
};
const myJWT = jwt.sign(payload, secretKey); */
 
require('./server/config/connectMongo')(); 
 
app.use(cors());
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

if (process.env.NODE_ENV !== 'production') {
  const allowCrossDomain = (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Cache-Control',
      );

      app.use(allowCrossDomain);
  };
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//require('./server/routes')(app); 
//require('./server/routes/player.routes')(app);
require('./server/routes/user.routes')(app);
 
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
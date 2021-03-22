const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

// application /x-www-form-urlencoded 이렇게 생긴 데이터를 가져올수 있게 하는 것
app.use(bodyparser.urlencoded({ extended: true }));
// application / json 타입의 데이터를 가져올 수 있게 하는 것
app.use(bodyparser.json());
// cookieParser 사용할 수 있게 해주는 것
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('몽고연결 굿');
  })
  .catch((err) => {
    console.log(`MONGO BAD : ${err}`);
  });

app.use('/api/users', require('./routes/users'));

app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = 5000;

app.listen(port, () => {
  console.log(`${port} 잘 돌아가고 있음`);
});

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    // trim: true는 email id 중간의 공백을 매워주는 역할
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 8,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 비밀번호를 암초화시키는 mothod
userSchema.pre('save', function (next) {
  let user = this;
  // 비밀번호를 암호화시킨다
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRound, function (err, salt) {
      if (err) {
        return next(err);
      } else {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            return next(err);
          } else {
            user.password = hash;
            next();
          }
        });
      }
    });
  } else {
    next();
  }
});

// 비밀번호 체크하는 method
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 토큰을 생성하는 mothod
userSchema.methods.generateToken = function (cb) {
  let user = this;
  // jwt를 이용해 token생성하기
  let token = jwt.sign(user._id.toHexString(), 'secretToken');
  var oneHour = moment().add(1, 'hour').valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err, user) {
    if (err) {
      return cb(err);
    } else {
      cb(null, user);
    }
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // user._id + ''  = token
  //토큰을 decode 한다.
  jwt.verify(token, 'secretToken', function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };

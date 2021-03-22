const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

//  인증 확인을 위한 route + auth.js

router.get('/auth', auth, (req, res) => {
  // 여기까지 미들웨어(auth)를 통과해 왔다는건
  // 인증이 통과되었다는 것

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//  회원가입을 위한 route
router.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 받아오면
  // 정보를 데이터베이스에 넣는다

  const user = new User(req.body);
  // save는 몽고db에서 오는 method
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// login을 위한 route
router.post('/login', (req, res) => {
  // 요청된 이메일을 db에서 찾기
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: '등록된 이메일이 없습니다.',
      });

      // else = email이 있다면 요청된 이메일이 db에 있다면 비밀번호 확인
    } else {
      userInfo.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 맞지 않습니다.',
          });
        } // 비밀번호가 맞다면 토큰 생성하기
        else {
          userInfo.generateToken((err, userInfo) => {
            if (err) {
              return res.status(400).send(err);
            } else {
              // 토큰을 저장해야하는데 어디에 저장할지 정하기
              // (쿠키 or 로컬스토리지)
              // 이번에는 쿠키에 저장
              res.cookie('x_authExp', userInfo.tokenExp);
              res.cookie('x_auth', userInfo.token).status(200).json({
                loginSuccess: true,
                userId: userInfo._id,
              });
            }
          });
        }
      });
    }
  });
});

// 로그아웃을 위한 라우튼
router.get('/logout', auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;

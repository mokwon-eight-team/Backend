var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 통신 테스트
router.get('/health/check', function (req, res) {
  res
    .json({ message: 'ok' });
})

// 중복체크
router.post('/id/duplica', function (req, res) {
  User.findOne(
    {
      service_id: req.body.service_id
    },
    function (err, user) {
      if (err) {  // 데이터베이스 오류
        console.error(err);
        res
          .status(500)
          .json({ message: 'Database Failure' });
      }
      else {
        if (!user) {  // 사용 가능한 아이디
          res
            .status(303)
            .json({
              message: 'No Retrieved Data'
            });
        }
        else {  // 해당하는 조건의 사용자를 찾음 (중복된 값)
          res
            .status(409)
            .json({
              message: 'Conflict'
            });
        }
      }
    }
  )
})

// 로그인
router.post('/signin', function (req, res) {
  User.findOne(
    { // MySQL에서 where 절과 같은 역할
      service_id: req.body.service_id,
      password: req.body.password
    },
    function (err, user) {
      if (err) {  // 데이터베이스 오류
        console.error(err);
        res
          .status(500)
          .json({ message: 'Database Failure' });
      }
      else {
        if (!user) {  // 해당하는 조건의 사용자가 없음
          res
            .status(404)
            .json({
              message: 'No Retrieved Data'
            });
        }
        else {  // 해당하는 조건의 사용자를 찾음
          res
            .status(200)
            .json({
              message: 'Success'
            });
        }
      }
    }
  )
});

// 회원가입
router.put('/', async function (req, res) {
  try {
    await User.create({ // Mongoose Model을 활용한 데이터 Insert 메서드
      service_id: req.body.service_id,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      birth: req.body.birth,
      delivery_password: req.body.delivery_password,
    });

    res
      .status(201)
      .json({
        message: 'SignUp Success'
      });
  }
  catch (err) {
    console.error(err);
    if (err.code == 11000) {  // 아이디 중복 체크
      res
        .status(409)
        .json({
          message: 'Already Exist Service ID'
        });
    }
    else {  // 데이터베이스 오류
      res
        .status(500)
        .json({
          message: 'Database Failure'
        });
    }
  }
});

// 사용자 전체 리스트 조회
router.get('/list', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      res
        .status(500)
        .json({ message: 'Database Failure' });
    }
    else {
      res
        .status(200)
        .json({
          count: users.length,
          users: users
        });
    }

  })
})

// 사용자 조회
router.get('/one/:service_id', function (req, res) {
  User.findOne(
    { // MySQL에서 where 절과 같은 역할
      service_id: req.params.service_id,
    },
    function (err, user) {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ message: 'Database Failure' });
      }
      // 에러가 없을 때
      else {
        // 해당하는 조건의 사용자가 없음
        if (!user) {
          res
            .status(404)
            .json({
              message: 'No Retrieved Data'
            });
        }
        // 해당하는 조건의 사용자를 찾음
        else {
          res
            .status(200)
            .json({
              message: 'Success',
              user: user
            });
        }
      }

    })
})

// 비밀번호 찾기
router.post('/loss/secret', function (req, res) {
  User.findOne(
    { // MySQL에서 where 절과 같은 역할
      service_id: req.body.service_id,
      email: req.body.email
    },
    function (err, user) {
      if (err) {  // 데이터베이스 오류
        console.error(err);
        res
          .status(500)
          .json({ message: 'Database Failure' });
      }
      else {
        if (!user) {  // 해당하는 조건의 사용자가 없음
          res
            .status(404)
            .json({
              message: 'No Retrieved Data'
            });
        }
        else {  // 해당하는 조건의 사용자를 찾음
          res
            .status(200)
            .json({
              message: 'One Retrieved Data',
              value: user.password
            });
        }
      }

    })
})

module.exports = router;

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');

//Protect routs
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //Make sure token exists
  console.log('----', req.headers);
  if (!token) {
    console.log('hello1');

    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded._id);
    if (req.user.token !== token) {
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
    next();
  } catch (error) {
    console.log('hello');
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

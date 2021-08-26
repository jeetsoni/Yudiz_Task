const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Register user
//@route    POST /users
//@access   Public

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    sendTokenResponse(user, 200, res);
  } catch (e) {
    res.status(400).send(e);
  }
};

//@desc     Login user
//@route    POST /users/login
//@access   Public
exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) {
      res.status(400).send({
        message: 'Unable to login',
      });
    }
    sendTokenResponse(user, 200, res);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.home = async (req, res) => {
  res.status(200).send({
    message: 'Welcome',
  });
};

//Get token from modek, create cookie and send responese
const sendTokenResponse = async (user, statusCode, res) => {
  //Create tokne
  const token = await user.generateAuthToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.createdAt;
  delete userObject.updatedAt;

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ userObject, token });
};

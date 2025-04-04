const catchAsync = require('../utils/catchAsync');
const { authService, tokenService } = require('../services');
const SuccessResponse = require('../utils/ApiSuccess');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthTokens(user);
  return SuccessResponse.ok(res, { user, token }, 'Logged in successfully');
});

module.exports = {
  login,
};

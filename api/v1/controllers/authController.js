// Library

const router = require('express').Router();
const httpCode = require('http-status-codes');
const { celebrate } = require('celebrate');

// Services

const ErrorHandler = require('../../utils/errorHandler');
const userService = require('../services/userService');
const { MESSAGES } = require('../../../constants');

// Imports

const { resetPasswordToken, confirmEmailToken } = require('../middleware/auth');
const { sendResetPasswordLink } = require('../services/mailService');
const { verifyHash, generateHash } = require('../middleware/hash');
const { userSchema } = require('../validators/user.schema');

// Functions

const confirmEmail = async (req, res) => {
  try {
    if (req.user.isEmailConfirmed)
      return res.sendError(
        httpCode.StatusCodes.OK,
        MESSAGES.api.EMAIL_ALREADY_CONFIRMATION
      );

    const updatedValues = {
      isEmailConfirmed: true,
    };

    const getUser = await userService.updateUser(req.user, updatedValues);

    if (getUser.status === 'ERROR_FOUND')
      throw new Error('Unable to get Confirm Email');

    res.sendSuccess(
      MESSAGES.api.EMAIL_VERIFICATION_SUCCESSFULL,
      httpCode.StatusCodes.ACCEPTED
    );
  } catch (ex) {
    ErrorHandler.extractError(ex);
    res.sendError(
      httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
      MESSAGES.api.SOMETHING_WENT_WRONG
    );
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.query;

  try {
    const updatedData = await userService.updateUser(
      { email },
      { isPasswordReset: true }
    );

    if (updatedData === undefined || updatedData.status === 'NOT_FOUND') {
      return res.sendError(
        httpCode.StatusCodes.BAD_REQUEST,
        MESSAGES.api.USER_NOT_FOUND
      );
    }

    if (updatedData.status === 'ERROR_FOUND')
      throw new Error('Unable to Update User data in Database');

    const sendEmail = await sendResetPasswordLink(updatedData.result, req);

    if (sendEmail.status === 'ERROR_FOUND')
      throw new Error('Unable to send Forget Password Mail to User');

    res.sendSuccess(MESSAGES.api.PASSWORD_RESET_LINK, httpCode.StatusCodes.OK);
  } catch (ex) {
    ErrorHandler.extractError(ex);
    res.sendError(
      httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
      MESSAGES.api.SOMETHING_WENT_WRONG
    );
  }
};

const resetPassword = async (req, res) => {
  try {
    const userData = await userService.getPassword(req.user);

    if (userData.status === 'ERROR_FOUND' || userData === undefined)
      throw new Error('Unable to retrieve user data from database');

    if (!req.user.isPasswordReset)
      return res.sendError(
        httpCode.StatusCodes.BAD_REQUEST,
        MESSAGES.api.PASSWORD_RESET_LINK_NOT_GENERATED
      );

    const verifyPassword = await verifyHash(
      userData.result.password,
      req.body.password
    );

    if (verifyPassword.status === 'SUCCESS') {
      return res.sendError(
        httpCode.StatusCodes.BAD_REQUEST,
        MESSAGES.api.SAME_AS_PREV_PASSWORD
      );
    }

    if (verifyPassword.status === 'ERROR_FOUND')
      throw new Error(
        'Error in Password verification with the stored password in database'
      );

    const hashedPassword = await generateHash(req.body.password);

    if (hashedPassword.status === 'ERROR_FOUND')
      throw new Error('Unable to generate Hashed Password');

    const updateUser = await userService.updateUser(req.user, {
      password: hashedPassword.hash,
      isPasswordReset: false,
    });

    if (updateUser.status === 'ERROR_FOUND') {
      return res.sendError(
        httpCode.StatusCodes.BAD_REQUEST,
        MESSAGES.api.UPDATE_UNSUCCESSFULL
      );
    }

    res.sendSuccess(MESSAGES.api.UPDATE_SUCCESSFULL, httpCode.StatusCodes.OK);
  } catch (ex) {
    ErrorHandler.extractError(ex);
    res.sendError(
      httpCode.StatusCodes.INTERNAL_SERVER_ERROR,
      MESSAGES.api.SOMETHING_WENT_WRONG
    );
  }
};

// Define all the auth route here

router.get('/confirmemail', confirmEmailToken, confirmEmail);

router.get('/forgetpassword', forgetPassword);

router.post(
  '/reset',
  resetPasswordToken,
  celebrate({
    body: userSchema,
  }),
  resetPassword
);

module.exports = router;

const { User } = require('../../models/user');

const { HttpError, sendEmail } = require('../../helpers/');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a
        target="_blank"
        href="${BASE_URL}/api/users/verify/${user.verificationCode}"
      >
        Click for verify your email
      </a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;

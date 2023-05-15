const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models/user');

const { HttpError, sendEmail } = require('../../helpers/');

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'This email is already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url({ email });
  const verificationCode = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a
        target="_blank"
        href="${BASE_URL}/api/users/verify/${verificationCode}"
      >
        Click for verify your email
      </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;

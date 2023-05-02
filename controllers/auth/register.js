const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models/user');

const { HttpError } = require('../../helpers/');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'This email is already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url({ email });

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;

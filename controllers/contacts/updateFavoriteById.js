const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers/');

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(result);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateFavoriteById;

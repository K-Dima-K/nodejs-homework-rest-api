const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers/');

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: 'Delete success' });
};

module.exports = deleteContact;

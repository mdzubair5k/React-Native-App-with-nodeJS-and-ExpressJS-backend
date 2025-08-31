const yup = require('yup');

//  Schema for creating a new message

const createMessageSchema = yup.object().shape({
  content: yup.string().required('Content is required'),
  is_user: yup.boolean().notRequired(),
});

// Schema for updating an existing message

const updateMessageSchema = yup.object().shape({
  content: yup.string().required('Content is required'),
});

module.exports = {
  createMessageSchema,
  updateMessageSchema,
};

const yup = require('yup');

const registerSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
  email: yup.string().email('Invalid email').required(),
  name: yup.string().required(),
});

const loginSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

module.exports = {
  registerSchema,
  loginSchema,
};

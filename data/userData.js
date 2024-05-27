import bcrypt from 'bcryptjs';

const user = [
  {
    username: 'admin',
    email: 'admin@demo.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default user;

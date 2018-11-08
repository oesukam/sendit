import express from 'express';
import { celebrate } from 'celebrate';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import { users } from '../validators/index';
import User from '../models/User';
import mailer from '../controllers/mailer';

const router = express.Router();
const { URL } = process.env;

// Signup route
router.post('/', celebrate({
  body: users.signup,
}),
(req, res) => {
  let success = false;
  const { JWT_SECRET } = process.env;
  let token;
  const { body } = req;
  const user = new User();

  // Confirmation code to be sent to the user by email
  user.confirmed = false;
  user.confirmationCode = faker.random.uuid();

  // Assigns all body fields to User model
  const fields = Object.keys(body);
  fields.forEach((field) => {
    if (body[field]) {
      // Check if the field is password in order to hash the string
      if (field === 'password') {
        user.password = bcrypt.hashSync(body.password, 10);
      }
      user[field] = body[field];
    }
  });
  const userData = user.save();

  if (userData) {
    success = true;
    token = jwt.sign({ id: userData.id, userType: userData.userType }, JWT_SECRET);

    const mailBody = `
      <div style="background-color: #3359DF; padding: 20px;">
        <h1 style="color: #fff; text-align: center;">SendIT - Email Confirmation</h1>
      </div>
      <p style="font-size: 1.2rem; line-height: 2rem;">
        Hello ${user.firstName}, <br>
        Thank you for creating an account with us, please proceed to
        to confirm your email.
      <p/>
      <div style="text-align: center; padding: 20px;">
        <a 
          href="${URL}/api/v1/users/confirmEmail/${user.confirmationCode}"
          style="color: #fff; background-color: #3359DF; padding: 10px 20px; font-size: 1.2rem; text-align: center; text-decoration: none;"
        >
          Confirm email
        </a>
      </div>
      Thank you, <br>
      Andela - SendIT Team
    `;
    mailer({ subject: 'Email confirmation', to: userData.email, html: mailBody });
  }

  // Delete password from the returned object
  delete userData.password;

  res.status(201).json({ success, data: userData, token });
});

// Users route accessible to admins only
router.get('/', (req, res) => {
  const user = new User();
  const { page = 1 } = req.params;

  res.json({ data: user.getAll({ page }) });
});

export default router;

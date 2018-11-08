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
    if (body[field] !== undefined) {
      // Check if the field is password in order to hash the string
      if (field === 'password') {
        user.password = bcrypt.hashSync(body.password, 10);
      }
      user[field] = body[field];
    }
  });
  const saved = user.save();

  if (saved) {
    success = true;
    token = jwt.sign({ id: user.id, userType: user.userType }, JWT_SECRET);

    const mailBody = `
      <div style="color: #5a5a5a;">
        <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
          <h2 style="color: #3359DF; text-align: center;">SendIT - Email Confirmation</h2>
        </div>
        <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
          Hello ${user.firstName}, <br>
          Thank you for creating an account with us, please proceed to
          to confirm your email.
        <p/>
        <div style="text-align: center; padding: 20px;">
          <a 
            href="${URL}/api/v1/users/${user.id}/confirmEmail/${user.confirmationCode}"
            style="color: #fff; background-color: #3359DF; padding: 10px 20px; font-size: 1.2rem; text-align: center; text-decoration: none;"
          >
            Confirm email
          </a>
          <p style="font-size: 1.5rem; margin-top: 30px; color: #5a5a5a !important">
            Or copy the link below
          <p>
          <br>
          ${URL}/api/v1/users/${user.id}/confirmEmail/${user.confirmationCode} 
        </div>

        <p style="color: #5a5a5a !important;"
          Thank you, <br>
          Andela - SendIT Team
        </p>
      </div>
    `;
    mailer({ subject: 'Email confirmation', to: user.email, html: mailBody });
  }


  return res.status(201).json({ success, data: user.toObject(), token });
});

// Confirm email route
router.get('/:userId/confirmEmail/:confirmationCode',
  (req, res) => {
    let success = false;
    let token;
    const { userId, confirmationCode } = req.params;
    const user = new User();
    let userData = user.getById(userId);
    if (!userData) {
      return res.status(404).json({ success });
    }
    if (userData.confirmed) {
      return res.status(404).json({ success, msg: `${userData.email} has already been confimed` });
    }
    if (confirmationCode !== userData.confirmationCode) {
      return res.status(404).json({ success, msg: 'Confirmation code is incorrect' });
    }
    userData.confirmed = true;
    userData.confirmationCode = null;
    // Assigns all body fields to User model
    const savedData = userData.save();

    if (savedData) {
      success = true;
      const mailBody = `
        <div style="color: #5a5a5a;">
          <div style="border-bottom: 1px solid #3359DF; padding: 15px;">
            <h2 style="color: #3359DF; text-align: center;">SendIT - Email Confirmation</h2>
          </div>
          <p style="font-size: 1.2rem; line-height: 2rem; color: #5a5a5a;">
            Your email <${userData.email}> has been confirmed, your are now
            able to make a parcel delivery order
          <p/>
          <p style="color: #5a5a5a !important;"
            Thank you, <br>
            Andela - SendIT Team
          </p>
        </div>
      `;
      mailer({ subject: 'Email confirmed', to: userData.email, html: mailBody });
    }

    return res.status(201).json({ success, data: userData.toObject({ withHidden: true }), token });
  });

// Users route accessible to admins only
router.get('/', (req, res) => {
  const user = new User();
  const { page = 1 } = req.params;

  res.json({ data: user.getAll({ page }) });
});

export default router;

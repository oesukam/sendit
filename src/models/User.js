
import BaseModel from './BaseModel';

class User extends BaseModel {
  constructor(args) {
    super(args);
    this.arrayName = 'users';
    this.userType = 'user'; // Normal user type by default
    this.hidden = ['password', 'confirmed', 'confirmationCode'];
  }
}

export default User;

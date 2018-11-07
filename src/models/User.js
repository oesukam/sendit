
import BaseModel from './BaseModel';

class User extends BaseModel {
  constructor (args) {
    super(args);
    this.arrayName = 'users';
  }
}

export default User;

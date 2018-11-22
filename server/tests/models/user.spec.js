import User from '../../src/models/User';
import { userData } from '../data';

describe('user model', () => {
  it('should create an instance of User', () => {
    const user = new User();
    expect(user.storage).toBe('users');
    expect(user.userType).toBe('user');
    expect(user.hidden[0]).toBe('password');
  });

  it('should add another user to global users\' array', (done) => {
    const user = new User({ ...userData });
    user.save()
      .then((res) => {
        const { users = [] } = global;
        expect(users[users.length - 1].email).toBe(res.email);
        expect(res.email).toBe(userData.email);
        done();
      })
      .catch(() => done());
  });

  it('should return undefined', (done) => {
    const user = new User();
    expect(user.findByEmail()).toEqual(undefined);
    expect(user.email).toEqual(undefined);
    done();
  });

  it('should return null', (done) => {
    const user = new User();
    expect(user.findByEmail('email@email.com')).toEqual(null);
    done();
  });

  it('should return an object', (done) => {
    const user = new User();
    expect(user.findByEmail('user@email.com')).toBeDefined();
    done();
  });
});

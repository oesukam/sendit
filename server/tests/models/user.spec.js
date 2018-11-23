import User from '../../src/models/User';
import { userData } from '../data';
import db from '../../src/db';
import { deleteTestUser, deleteTestParcels } from '../queries';

describe('user model', () => {
  beforeAll((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    db.query(deleteTestUser, [])
      .then(() => done())
      .catch(() => done());
  });
  afterAll(async (done) => {
    db.query(deleteTestParcels, [])
      .then(() => done())
      .catch(() => done());
  });
  afterEach(async (done) => {
    db.query(deleteTestUser, [])
      .then(() => done())
      .catch(() => done());
  });

  it('should create an instance of User', () => {
    const user = new User();
    expect(user.storage).toBe('users');
    expect(user.user_type).toBe('user');
    expect(user.hidden[0]).toBe('password');
  });

  it('should add a new user', (done) => {
    const user = new User({ ...userData });
    user.save()
      .then((res) => {
        expect(res.email).toBe(userData.email);
        done();
      })
      .catch(() => done());
  });

  it('should return undefined', (done) => {
    const user = new User();
    user.findByEmail()
      .then((res) => {
        expect(res.data).toEqual(undefined);
        expect(res.email).toEqual(undefined);
        done();
      })
      .catch(() => done());
  });

  it('should return null', (done) => {
    const user = new User();
    user.findByEmail('email@email.com')
      .then((res) => {
        expect(res.data).toEqual(undefined);
        done();
      })
      .catch(() => done());
  });

  it('should return an object', async (done) => {
    const user = new User({ ...userData });
    await user.save();
    user.findByEmail(userData.email)
      .then((res) => {
        expect(res.data).toBeDefined();
        done();
      })
      .catch(() => done());
  });
});

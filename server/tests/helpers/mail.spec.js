import mailer from '../../src/helpers/mailer';
import run from '../../src/index';
import { mailInfo } from '../data';

const TIMEOUT_SECOND = 30000;
describe('mailer', () => {
  let server;
  beforeAll((done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
    done();
  });
  afterAll(() => {
    server.close();
  });

  describe('send email with correct from address', () => {
    let success = false;
    let error;
    beforeAll((done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
      mailer({ ...mailInfo })
        .then(() => {
          success = true;
          done();
        })
        .catch((err) => {
          error = err;
          done();
        });
    });

    it('should return true', () => {
      expect(success).toBeTruthy();
      expect(error).toBeUndefined();
    });
  });

  describe('send email with wrong from address', () => {
    let success = false;
    let error;
    beforeAll((done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
      mailer({ ...mailInfo, from: '"Andela - SendIT" <sendit.service>' })
        .then(() => {
          success = true;
          done();
        })
        .catch((err) => {
          error = err;
          done();
        });
    });

    it('should return an object response code 501', () => {
      expect(success).toBeFalsy();
      expect(error.responseCode).toBe(501);
    });
  });

  it('send email without to address', (done) => {
    mailer({ ...mailInfo, to: '' })
      .then(() => {
        done();
      })
      .catch((err) => {
        expect(err).toBe('Please provide to email address');
        done();
      });
  });
});

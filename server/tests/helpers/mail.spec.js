import mailer from '../../src/helpers/mailer';
import run from '../../src/index';
import { userMail } from '../data';

describe('mailer', () => {
  let server;
  beforeAll((done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    done();
  });
  afterAll(() => {
    server.close();
  });

  // Sending an email test
  describe('send email with correct from address', () => {
    let success = false;
    beforeAll((done) => {
      const mailInfo = {
        from: '"Andela - SendIT" <admin@sendit.service>',
        to: 'oesukam@gmail.com',
        subject: 'Testing email',
        text: 'Testing email',
        html: '<h2>Testing email</h2>',
      };
      mailer(mailInfo)
        .then(() => {
          success = true;
          done();
        })
        .catch((error) => {
          success = error;
          done();
        });
    });

    it('should return true', () => {
      expect(success).toBeTruthy();
    });
  });

  describe('send email with wrong from address', () => {
    let success = false;
    beforeAll((done) => {
      const mailInfo = {
        from: '"Andela - SendIT" <sendit.service>',
        to: 'oesukam@gmail.com',
        subject: 'Testing email',
        text: 'Testing email',
        html: '<h2>Testing email</h2>',
      };
      mailer(mailInfo)
        .then(() => {
          success = true;
          done();
        })
        .catch((error) => {
          success = error;
          done();
        });
    });

    it('should return an object response code 501', () => {
      expect(success.responseCode).toBe(501);
    });
  });
});

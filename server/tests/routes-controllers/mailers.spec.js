import mailers from '../../src/controllers/mailers';
import run from '../../src/index';
import { userMail, parcelData } from '../data';

describe('mailer', () => {
  let server;
  beforeAll((done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    done();
  });
  afterAll((done) => {
    server.close();
    done();
  });

  // testing user registration email confirmation
  describe('sendConfirmEmail', () => {
    let success = false;
    beforeAll((done) => {
      mailers.sendConfirmEmail(userMail)
        .then(() => {
          success = true;
          done();
        })
        .catch(() => {
          success = false;
          done();
        });
    });

    it('should return true', () => {
      expect(success).toBeTruthy();
    });
  });

  // testing email verified notification
  describe('sendEmailConfirmed', () => {
    let success = false;
    beforeAll((done) => {
      mailers.sendEmailConfirmed(userMail)
        .then(() => {
          success = true;
          done();
        })
        .catch(() => {
          success = false;
          done();
        });
    });

    it('should return true', () => {
      expect(success).toBeTruthy();
    });
  });

  // testing parcel status changes notification
  describe('sendParcelStatusChanged', () => {
    let success = false;
    beforeAll((done) => {
      mailers.sendParcelStatusChanged(userMail, parcelData)
        .then(() => {
          success = true;
          done();
        })
        .catch(() => {
          success = false;
          done();
        });
    });

    it('should return true', () => {
      expect(success).toBeTruthy();
    });
  });

  // testing parcel location changed notification
  describe('sendParcelLocationChanged', () => {
    let success = false;
    beforeAll((done) => {
      mailers.sendParcelLocationChanged(userMail, parcelData)
        .then(() => {
          success = true;
          done();
        })
        .catch(() => {
          success = false;
          done();
        });
    });

    it('should return true', () => {
      expect(success).toBeTruthy();
    });
  });
});

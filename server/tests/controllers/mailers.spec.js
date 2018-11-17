import mailers from '../../src/controllers/mailers';
import User from '../../src/models/User';
import Parcel from '../../src/models/Parcel';
import run from '../../src/index';


describe('mailer', () => {
  let server;
  let parcel;
  let user;
  beforeAll((done) => {
    parcel = new Parcel().getFirst();
    user = new User().findById(parcel.userId);
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    done();
  });
  afterAll(() => {
    server.close();
  });

  // testing email confirmation
  describe('sendConfirmEmail', () => {
    let sucess = false;
    beforeAll((done) => {
      mailers.sendConfirmEmail(user)
        .then(() => {
          sucess = true;
          done();
        })
        .catch(() => {
          sucess = false;
          done();
        });
    });

    it('should return true', () => {
      expect(sucess).toBeTruthy();
    });
  });

  // testing email verified notification
  describe('sendConfirmEmail', () => {
    let sucess = false;
    beforeAll((done) => {
      mailers.sendEmailConfirmed(user)
        .then(() => {
          sucess = true;
          done();
        })
        .catch(() => {
          sucess = false;
          done();
        });
    });

    it('should return true', () => {
      expect(sucess).toBeTruthy();
    });
  });

  // testing parcel status changes notification
  describe('sendParcelStatusChanged', () => {
    let sucess = false;
    beforeAll((done) => {
      mailers.sendParcelStatusChanged(user, parcel)
        .then(() => {
          sucess = true;
          done();
        })
        .catch(() => {
          sucess = false;
          done();
        });
    });

    it('should return true', () => {
      expect(sucess).toBeTruthy();
    });
  });

  // testing parcel location changed notification
  describe('sendParcelLocationChanged', () => {
    let sucess = false;
    beforeAll((done) => {
      mailers.sendParcelLocationChanged(user, parcel)
        .then(() => {
          sucess = true;
          done();
        })
        .catch(() => {
          sucess = false;
          done();
        });
    });

    it('should return true', () => {
      expect(sucess).toBeTruthy();
    });
  });
});

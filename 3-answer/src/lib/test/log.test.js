import log from '../log';

let
  example = {
    errorMsg: 'errorMessage',
    location: '/location'
  },
  partialTests = {
    errorObject: function (error, type) {
      expect(example.location).to.equal(error.location);
      expect(type || log.privates.TYPES.ERROR).to.equal(error.type);
      expect(error.error).to.be.an('error');
      expect(error.error).to.have.property('message', example.errorMsg);
    }
  };

describe('Log', function() {
  it('testing normalizeLogArguments() - array input', function() {
    partialTests.errorObject(
      log.privates.normalizeLogArguments([example.errorMsg, example.location])
    );
    partialTests.errorObject(
      log.privates.normalizeLogArguments([example.errorMsg, example.location], null, log.privates.TYPES.INFO),
      log.privates.TYPES.INFO
    );
  });

  it('testing normalizeLogArguments() - string input', function() {
    partialTests.errorObject(
      log.privates.normalizeLogArguments(example.errorMsg, example.location)
    );
    partialTests.errorObject(
      log.privates.normalizeLogArguments(example.errorMsg, example.location, log.privates.TYPES.INFO),
      log.privates.TYPES.INFO
    );
  });

  it('testing normalizeLogArguments() - Error input', function() {
    partialTests.errorObject(
      log.privates.normalizeLogArguments(Error(example.errorMsg), example.location)
    );
    partialTests.errorObject(
      log.privates.normalizeLogArguments(Error(example.errorMsg), example.location, log.privates.TYPES.INFO),
      log.privates.TYPES.INFO
    );
  });
});

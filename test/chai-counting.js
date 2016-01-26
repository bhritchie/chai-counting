(function (test) {
  if (typeof require === "function"&& typeof exports === "object"&& typeof module === "object") {
    // NodeJS
    (function () {
      var chai = require('chai');
      chai.config.includeStack = true;
      test(chai, true);
    }());
  }
  else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    test(chai, false);
  }
}(function (chai, testingServer) {

  var should = chai.should();
  var assert = chai.assert;
  var expect = chai.expect;

  if (testingServer) {
    var chai_counting = require('../chai-counting');
    chai.use(chai_counting);
  }

  chai.use(function (chai, utils) {

    // console.log(chai, utils);

    var inspect = utils.objDisplay;

    chai.Assertion.addMethod('fail', function (message) {

      var obj = this._obj;
      new chai.Assertion(obj).is.a('function');

      try {
        obj();
      }
      catch (err) {
        this.assert(
          err instanceof chai.AssertionError,
          'expected #{this} to fail, but it threw ' + inspect(err)
        );
        this.assert(
          err.message === message,
          'expected #{this} to fail with ' + inspect(message) + ', but got ' + inspect(err.message)
        );
        return;
      }

      this.assert(false, 'expected #{this} to fail');
    });
  });

  describe('chai-counting', function () {

    describe('one', function() {
      it('should be true when the actual value is 1', function() {
        expect(1).to.be.one;
        (1).should.be.one;
      });

      it('should be false when the actual value is not 1', function() {
        expect(2).not.to.be.one;
        (2).should.not.be.one;
        expect('1').not.to.be.one;
        '1'.should.not.be.one;
      });
    });

    describe('two', function() {
      it('should be true when the actual value is 2', function() {
        expect(2).to.be.two;
        (2).should.be.two;
      });

      it('should be false when the actual value is not 2', function() {
        expect(3).not.to.be.two;
        (3).should.not.be.two;
        expect('2').not.to.be.two;
        '2'.should.not.be.two;
      });
    });

  });
}));
import utils from '../utils';

describe('Checking types', function() {
  it('should return correct type', function() {
    let types = {
      '[object Undefined]': undefined,
      '[object Number]': 1,
      '[object String]': 'test',
      '[object Object]': {},
      '[object Array]': [],
      '[object Function]': function () {}
    };

    for (let type in types) {
      expect(type).to.equal(utils.getType(types[type]));
    }
  });

  it('should checks if object', function() {
    expect(utils.isObject({})).to.be.true;
    expect(utils.isObject({ test: 123 })).to.be.true;

    expect(utils.isObject([])).to.be.false;
    expect(utils.isObject(1)).to.be.false;
    expect(utils.isObject('test')).to.be.false;
    expect(utils.isObject(null)).to.be.false;
    expect(utils.isObject(undefined)).to.be.false;
    expect(utils.isObject(0)).to.be.false;
  });

  it('should checks if number', function() {
    expect(utils.isNumber(1)).to.be.true;
    expect(utils.isNumber(1111.11)).to.be.true;
    expect(utils.isNumber(0)).to.be.true;

    expect(utils.isNumber([])).to.be.false;
    expect(utils.isNumber({})).to.be.false;
    expect(utils.isNumber('test')).to.be.false;
    expect(utils.isNumber(null)).to.be.false;
    expect(utils.isNumber(undefined)).to.be.false;
  });

  it('should checks if array', function() {
    expect(utils.isArray([])).to.be.true;
    expect(utils.isArray([1,2])).to.be.true;
    expect(utils.isArray([['test']])).to.be.true;

    expect(utils.isArray(0)).to.be.false;
    expect(utils.isArray(123)).to.be.false;
    expect(utils.isArray({})).to.be.false;
    expect(utils.isArray('test')).to.be.false;
    expect(utils.isArray(null)).to.be.false;
    expect(utils.isArray(undefined)).to.be.false;
  });

  it('should checks if string', function() {
    expect(utils.isString('')).to.be.true;
    expect(utils.isString('test')).to.be.true;

    expect(utils.isString(0)).to.be.false;
    expect(utils.isString(123)).to.be.false;
    expect(utils.isString({})).to.be.false;
    expect(utils.isString([])).to.be.false;
    expect(utils.isString(null)).to.be.false;
    expect(utils.isString(undefined)).to.be.false;
  });
});

describe('Checking cordinates', function() {
  it('should check if point contains correct coordinates', function() {
    expect(utils.validPointCordinates({ lat: 0, lng: 0 })).to.be.true;
    expect(utils.validPointCordinates({ lat: 50, lng: 10 })).to.be.true;

    expect(utils.validPointCordinates({ lat: '50', lng: '10' })).to.be.false;
    expect(utils.validPointCordinates({ lat: 'test', lng: 'test' })).to.be.false;
    expect(utils.validPointCordinates({ lat: null, lng: null })).to.be.false;
    expect(utils.validPointCordinates({ lat: NaN, lng: NaN })).to.be.false;
  });

  it('should calculating distance', function() {
    let
      pointA = { lat: 0, lng: 0 },
      pointB = { lat: 10, lng: 5 };

    expect(0).to.equal(utils.calculateDistance(pointA, pointA));
    expect(0).to.equal(utils.calculateDistance(pointB, pointB));
    expect(utils.calculateDistance(pointA, pointB)).to.be.within(1240, 1250);
    expect(utils.calculateDistance(pointB, pointA)).to.be.within(1240, 1250);
  });
});

describe('Checking cordinates', function() {
  it('should check if point contains correct coordinates', function() {
    expect(utils.validPointCordinates({ lat: 0, lng: 0 })).to.be.true;
    expect(utils.validPointCordinates({ lat: 50, lng: 10 })).to.be.true;

    expect(utils.validPointCordinates({ lat: '50', lng: '10' })).to.be.false;
    expect(utils.validPointCordinates({ lat: 'test', lng: 'test' })).to.be.false;
    expect(utils.validPointCordinates({ lat: null, lng: null })).to.be.false;
    expect(utils.validPointCordinates({ lat: NaN, lng: NaN })).to.be.false;
  });

  it('should calculating distance', function() {
    let
      pointA = { lat: 0, lng: 0 },
      pointB = { lat: 10, lng: 5 };

    expect(0).to.equal(utils.calculateDistance(pointA, pointA));
    expect(0).to.equal(utils.calculateDistance(pointB, pointB));
    expect(utils.calculateDistance(pointA, pointB)).to.be.within(1240, 1250);
    expect(utils.calculateDistance(pointB, pointA)).to.be.within(1240, 1250);
  });

  it('should extended test() function from constructor', function() {
    let obj1 = function () {};
    let obj2 = function () {};

    obj2.test = function () {};
    utils.extend(obj1, obj2);

    expect(obj1.test).to.be.undefined;
    expect(obj1.extended).to.be.a('object');
    expect(obj1.extended.test).to.be.a('function');

    expect(obj2.test).to.be.a('function');
    expect(obj2.extended).to.be.undefined;
  });

  it('should extended test() function from object', function() {
    let obj1 = function () {};

    utils.extend(obj1, {
      test: function () {}
    });

    expect(obj1.test).to.be.undefined;
    expect(obj1.extended).to.be.a('object');
    expect(obj1.extended.test).to.be.a('function');
  });
});

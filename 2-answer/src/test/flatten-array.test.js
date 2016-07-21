var
  expect = require('chai').expect,
  flattenArray = require('../flatten-array');

describe('FlattenArray library', function() {
  it('should return [] when input contains all empty variations of array', function() {
    expect([]).to.eql(flattenArray([]));
    expect([]).to.eql(flattenArray([[]]));
    expect([]).to.eql(flattenArray([[], []]));
  });

  it('should thrown Error when input is not array', function() {
    expect(flattenArray()).to.be.undefined;
    expect(flattenArray(NaN)).to.be.undefined;
    expect(flattenArray('string')).to.be.undefined;
    expect(flattenArray(123)).to.be.undefined;
    expect(flattenArray(null)).to.be.undefined;
    expect(flattenArray(false)).to.be.undefined;
    expect(flattenArray(function() {})).to.be.undefined;
    expect(flattenArray({})).to.be.undefined;
  });

  it('should returned flatten array with integers', function() {
    expect([1, 2, 3]).to.eql(flattenArray([1, 2, 3]));
    expect([1, 2, 3]).to.eql(flattenArray([[1], 2, 3]));
    expect([1, 2, 3]).to.eql(flattenArray([1, [2], 3]));
    expect([1, 2, 3]).to.eql(flattenArray([1, 2, [3]]));
    expect([1, 2, 3, 4]).to.eql(flattenArray([[1], [2], [3, 4]]));
    expect([1, 2, 3, 4]).to.eql(flattenArray([[1], [2], [3, [4]]]));
    expect([1, 2, 3, 4, 5, 6]).to.eql(flattenArray([[1], [2], [3, [4, [5, 6]]]]));
    expect([1, 2, 3, 4, 5, 6]).to.eql(flattenArray([[1], [2], [3, [4, [5, 6, undefined]]]]));
    expect([1, 2, 3, 4, 5, 6]).to.eql(flattenArray([[1], [2], [3, [4, [5, 6, undefined, [undefined]]]]]));

    expect([]).to.eql(flattenArray(['test', NaN, undefined, {}, true, function() {}]));
  });
});

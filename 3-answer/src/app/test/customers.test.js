import Customers from '../customers';
import CONSTANTS from '../constants';
import utils from 'utils';
import promise from 'es6-promise';

let exampleItems = [];
let rawData = require('raw!../../data/customers.txt');
let partialTests = {
  checkItems: function (items) {
    expect(items).to.be.a('array');
    expect(items).to.not.be.empty;
  }
};

describe('Customers', function () {
  before(function () {
    utils.extend(Customers.prototype, {
      // Pretend reader with read function
      read: function () {
        return new promise.Promise((resolve, reject) => {
          resolve(rawData);
        });
      }
    });
  });

  it('Testing getAll()', function (done) {
    let
      progressSpy = sinon.spy(),
      customer = new Customers(),
      result = customer.getAll({
        maxDistance: 100,
        sortBy: 'user_id'
      });

    result.then((items) => {
      partialTests.checkItems(items);
      expect(customer.toHTML(items[0])).to.not.be.empty;

      exampleItems = items;
      done();
    }, function (err) {
      done(err);
    });
  });

  it('Testing preprocessData()', function () {
    partialTests.checkItems(Customers.privates.preprocessData(rawData));
  });

  it('Testing preprocessItem()', function () {
    let item = Customers.privates.preprocessItem(rawData.split('\n')[0]);

    expect(item).to.be.a('object');
    expect(item).to.have.property('user_id');
    expect(item).to.have.property('latitude');
    expect(item).to.have.property('longitude');
    expect(item).to.have.property('name');
  });

  it('Testing sortData() - ASC sorting', function () {
    let items = Customers.privates.sortData([{'user_id': 1}, {'user_id': 2}], {
      sortBy: 'user_id',
      sortDirection: CONSTANTS.SORT_DIRECTIONS.ASC
    });

    expect(items).to.be.a('array');
    expect(items[0]).to.have.property('user_id', 1);
    expect(items[1]).to.have.property('user_id', 2);
  });

  it('Testing sortData() - DESC sorting', function () {
    let items = Customers.privates.sortData([{'user_id': 1}, {'user_id': 2}], {
      sortBy: 'user_id',
      sortDirection: CONSTANTS.SORT_DIRECTIONS.DESC
    });

    expect(items).to.be.a('array');
    expect(items[0]).to.have.property('user_id', 2);
    expect(items[1]).to.have.property('user_id', 1);
  });
});

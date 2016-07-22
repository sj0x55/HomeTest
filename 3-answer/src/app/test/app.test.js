import app from '../app';

describe('app', function() {
  it('Testing private generateHTML() - simple strings', function () {
    let inputData = ['a', 'b'];

    expect('').to.equal(app.privates.generateHTML(
      (item) => undefined,
      inputData
    ));
    expect('').to.equal(app.privates.generateHTML(
      (item) => null,
      inputData
    ));
    expect('').to.equal(app.privates.generateHTML(
      (item) => '',
      inputData
    ));
    expect('ab').to.equal(app.privates.generateHTML(
      (item) => item,
      inputData
    ));
    expect('aabb').to.equal(app.privates.generateHTML(
      (item) => item.concat(item),
      inputData
    ));
  });

  it('Testing private generateHTML() - objects', function () {
    let inputData = [
      {value: 'test1'},
      {value: 'test2'},
    ];

    expect('test1test2').to.equal(app.privates.generateHTML(
      (item) => item.value,
      inputData
    ));
    expect('').to.equal(app.privates.generateHTML(
      (item) => item.wrong_key,
      inputData
    ));
  });
});

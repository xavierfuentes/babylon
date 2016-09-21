var expect = require('chai').expect;
var Checkout = require('../checkout');

describe('Checkout', () => {

  describe('Structure', () => {
    it('should have a "scan" public method', () => {
      const co = new Checkout();
      expect(co).to.respondTo('scan');
    });

    it('should have a "total" public method', () => {
      const co = new Checkout();
      expect(co).to.respondTo('total');
    });
  })

  describe('Basic functionality', () => {
    let co = new Checkout();
    co.scan({code: '001', name: 'Article 1', price: '£1'});
    co.scan({code: '002', name: 'Article 2', price: '£2'});
    co.scan({code: '002', name: 'Article 2', price: '£2'});

    it('should scan items and store them', () => {
      expect(co.items).to.deep.equal([
        {code: '001', name: 'Article 1', price: '£1'},
        {code: '002', name: 'Article 2', price: '£2'},
        {code: '002', name: 'Article 2', price: '£2'}
      ]);
    });

    it('should calculate the total price', () => {
      expect(co.total()).to.equal(5);
    });
  })

  describe('Standard promotional rules', () => {
    let co;

    beforeEach(() => {
      co = new Checkout();
    })

    it('should apply 10% discount if you spend over £60', () => {
      co.scan({code: '002', name: 'Personalised cufflinks', price: '£45'});
      co.scan({code: '003', name: 'Kids T-shirt', price: '£19.95'});
      expect(co.total()).to.equal(58.46);
    });

    it('should drop the price of "lavender hearts" to £8.5 when buying 2 or more', () => {
      co.scan({code: '001', name: 'Lavender hearts', price: '£9.25'});
      expect(co.total()).to.equal(9.25);
      co.scan({code: '001', name: 'Lavender hearts', price: '£9.25'});
      expect(co.total()).to.equal(17);
      co.scan({code: '001', name: 'Lavender hearts', price: '£9.25'});
      expect(co.total()).to.equal(25.5);
    });
  });

  describe('Custom promotional rules', () => {
    it('should apply custom promotional rules');
  })
})

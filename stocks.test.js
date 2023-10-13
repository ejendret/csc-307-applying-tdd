// module.test.js
import mut from './stocks.js';
import ShareSaleException from './stocks.js';

let portfolio; // Declare the portfolio variable in an accessible scope

// Create a new portfolio object for each test suite
beforeEach(() => {
    portfolio = new mut.Portfolio();
});

// Test suite for constructor
describe('Portfolio', () => {
    it('should have an empty stocks field', () => {
        expect(Object.keys(portfolio.stocks).length).toBe(0);
    });
});

// Test suite for the isEmpty function
describe('isEmpty', () => {
    it('should return true if the portfolio is empty', () => {
        expect(mut.isEmpty(portfolio)).toBeTruthy();
    });

    it('should return false if the portfolio is not empty', () => {
        portfolio.stocks = { "GME": 10 };
        expect(mut.isEmpty(portfolio)).toBeFalsy();
    });
});

// Test suite for the uniqueTickets  function
describe('uniqueTickers', () => {
    it('should return the number of unique tickers', () => {
        expect(mut.uniqueTickers(portfolio)).toBe(0);
        portfolio.stocks["GME"] = 10;
        expect(mut.uniqueTickers(portfolio)).toBe(1);
        portfolio.stocks["RBLX"] = 5;
        expect(mut.uniqueTickers(portfolio)).toBe(2);
    });
});

// Test suite for the purchase function
describe('purchase', () => {
    it('should do nothing if parameters invalid', () => {
        mut.purchase(portfolio, "GME", -5);
        expect(mut.uniqueTickers(portfolio)).toBe(0);
        mut.purchase(portfolio, 3, 5);
        expect(mut.uniqueTickers(portfolio)).toBe(0);
    });
    it('should create a new symbol if not already in portfolio', () => {
        let length = mut.uniqueTickers(portfolio);
        mut.purchase(portfolio, "GME", 5);
        expect(mut.uniqueTickers(portfolio)).toBe(length + 1);
    });
    it('should update a symbol if already in portfolio', () => {

        mut.purchase(portfolio, "GME", 5);
        let length = mut.uniqueTickers(portfolio);
        mut.purchase(portfolio, "GME", 1);
        expect(mut.uniqueTickers(portfolio)).toBe(length);
    });
    it('should add the correct number of shares', () => {
        mut.purchase(portfolio, "GME", 5);
        expect(portfolio.stocks["GME"]).toBe(5);
        mut.purchase(portfolio, "GME", 6);
        expect(portfolio.stocks["GME"]).toBe(11);
    });
});

// Test suite for the sale function
describe('sale', () => {
    it('should do nothing if parameters invalid', () => {
        // Check num shares to sell
        mut.sale(portfolio, "GME", -5);
        expect(mut.uniqueTickers(portfolio)).toBe(0);
        // Check symbol to sell
        mut.sale(portfolio, 3, 5);
        expect(mut.uniqueTickers(portfolio)).toBe(0);
    });
    it('should do nothing if ticker is not in portfolio', () => {
        mut.sale(portfolio, "GME", 6);
        expect(mut.uniqueTickers(portfolio)).toBe(0);
    });
    it('should throw exception if shares to sell is greater than shares held', () => {
        mut.purchase(portfolio, "GME", 5);
        expect(() => { mut.sale(portfolio, "GME", 6) }).toThrow(/ShareSaleException/);
        expect(portfolio.stocks["GME"]).toBe(5);
    });
    it('should subtract the correct number of shares', () => {
        mut.purchase(portfolio, "GME", 6);
        mut.sale(portfolio, "GME", 5);
        expect(portfolio.stocks["GME"]).toBe(1);
    });
    it('should remove ticker if shares becomes 0', () => {
        mut.purchase(portfolio, "GME", 5);
        mut.sale(portfolio, "GME", 5);
        expect("GME" in portfolio.stocks).toBeFalsy();
    });
});

// Test suite for numShares
describe('numShares', () => {
    it('should return -1 if paramters invalid', () => {
        // Check symbol to sell
        expect(mut.numShares(portfolio, 5)).toBe(-1);
    });
    it('should return -1 if ticker is not in portfolio', () => {
        expect(mut.numShares(portfolio, "GME")).toBe(-1);
    });
    it('should return the correct number of shares', () => {
        mut.purchase(portfolio, "GME", 5);
        expect(mut.numShares(portfolio, "GME")).toBe(5);
    });
});

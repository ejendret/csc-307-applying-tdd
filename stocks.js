function Portfolio() {
    this.stocks = {};
};


function isEmpty(portfolio) {
    return Object.keys(portfolio.stocks).length === 0;
}

function uniqueTickers(portfolio) {
    return Object.keys(portfolio.stocks).length;
}

function isPositiveInt(value) {
    return (Number.isInteger(value) && value > 0);
}

function isString(value) {
    return typeof value === 'string';
}

function purchase(portfolio, symbol, shares) {
    if (isPositiveInt(shares) && isString(symbol)) {
        if (symbol in portfolio.stocks) {
            portfolio.stocks[symbol] += shares;
        }
        else {
            portfolio.stocks[symbol] = shares;
        }
    }
}

function sale(portfolio, symbol, shares) {
    if (isPositiveInt(shares) && isString(symbol)) {
        if (symbol in portfolio.stocks) {
            if (portfolio.stocks[symbol] < shares) {
                throw new ShareSaleException("ShareSaleException");
            }
            else {
                portfolio.stocks[symbol] -= shares;
                if (portfolio.stocks[symbol] === 0) {
                    delete portfolio.stocks[symbol];
                }
            }
        }
    }
}

function numShares(portfolio, symbol) {
    if (isString(symbol) && symbol in portfolio.stocks) {
        return portfolio.stocks[symbol];
    }
    return -1;
}

class ShareSaleException extends Error {
    constructor(message) {
        super(message);
        this.name = "ShareSaleException";
    }
}
export default { Portfolio, isEmpty, uniqueTickers, purchase, sale, numShares };
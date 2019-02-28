const DS = require('../services/datastore');

const { KINDS: { COMPANY, PRICE } } = require('../config/constants');

class PricesController {
    async index(req, res) {
        const symbols = req.query.symbols ? req.query.symbols.split(',') : [];
        const { startDate, endDate } = req.query;
        const filters = [];

        if (startDate) {
            filters.push(['createdAt', '>=', new Date(startDate).getTime()])
        }

        if (endDate) {
            filters.push(['createdAt', '<=', new Date(endDate).getTime()])
        }

        const companyData = await Promise.all(symbols.map(async symbol => {
            const [[company]] = await DS.findByKey(COMPANY, symbol);

            if (!company) {
                return;
            }

            const [prices] = await DS.query(PRICE, {
                filters: [
                    ...filters,
                    ['symbol', '=', symbol],
                ],
                select: ['price', 'createdAt']
            });

            company.prices = prices;
            return company;
        }));

        res.json(companyData);
    }
}

module.exports = new PricesController();
const PricesController = require('../prices');

const resJsonMock = jest.fn();
jest.mock('../../services/datastore');

describe('PricesController', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('index', () => {
        it('Should return data for one company without filters', async () => {
            await PricesController.index({ query: { symbols: 'aapl' }}, { json: resJsonMock });
            const result = resJsonMock.mock.calls[0][0];
            expect(result).toHaveLength(1);
            expect(result[0].prices).toHaveLength(2);
        });

        it('Should return data for multiple companies with filters', async () => {
            await PricesController.index({ query: { symbols: 'aapl,googl', startDate: 1, endDate: 1550000000001 }}, { json: resJsonMock });
            const result = resJsonMock.mock.calls[0][0];
            expect(result).toHaveLength(2);
            expect(result[0].prices).toHaveLength(1);
            expect(result[1].prices).toHaveLength(1);
        });

        it('Should return an empty array of prices if none are found', async () => {
            await PricesController.index({ query: { symbols: 'aapl', endDate: 1 }}, { json: resJsonMock });
            const result = resJsonMock.mock.calls[0][0];
            expect(result).toHaveLength(1);
            expect(result[0].prices).toHaveLength(0);
        });

        it('Should return an empty array if companies aren\'t specified', async () => {
            await PricesController.index({ query: { symbols: '' }}, { json: resJsonMock });
            const result = resJsonMock.mock.calls[0][0];
            expect(result).toHaveLength(0);
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
    })
});
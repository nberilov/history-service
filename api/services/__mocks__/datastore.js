const companyData = require('./__testdata__/companies');
const priceData = require('./__testdata__/prices');
const { KINDS: { COMPANY, PRICE } } = require('../../config/constants');

const DS = jest.genMockFromModule('../datastore');

const testData = {
    [COMPANY]: companyData,
    [PRICE]: priceData
};

DS.findByKey = async (kind, key) => {
    return [[testData[kind].find(e => e.__key__ === key)]];
};

DS.query = async (kind, { filters }) => {
    let result = testData[kind];

    for (const filter of filters) {
        if (filter[1] === '=') {
            result = result.filter(e => e[filter[0]] === filter[2]);
        }
        if (filter[1] === '>=') {
            result = result.filter(e => e[filter[0]] >= filter[2]);
        }
        if (filter[1] === '<=') {
            result = result.filter(e => e[filter[0]] <= filter[2]);
        }
    }

    return [result];
};

module.exports = DS;
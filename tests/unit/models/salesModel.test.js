const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');

const  salesModel  = require('../../../src/models/salesModel');
const salesModelMock = require('../../mock/salesMock');

describe('Testa a camada SalesModel', function () {

  it('Verifica se possui a lista de todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([salesModelMock]);

      const response = await salesModel.getAll();

      expect(response).to.be.deep.equal(salesModelMock);
  });
  
  it('Verifica se realiza a busca de uma venda pelo Id', async function () {
    const saleId = 1;

    const saleDub = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }]

    sinon.stub(connection, 'execute').resolves([saleDub]);

    const response = await salesModel.getById(saleId);

    expect(response).to.be.deep.equal(saleDub);
  });
  
  it('Verifica se é possivel a inserção de uma nova venda', async function () {
      const insertId = 5;
      const dbReturn = [{ insertId }];

      sinon.stub(connection, 'execute').resolves(dbReturn);

      const response = await salesModel.create(insertId);

      expect(response).to.be.deep.equal(5);
  });
 

  afterEach(function () { sinon.restore() });

});
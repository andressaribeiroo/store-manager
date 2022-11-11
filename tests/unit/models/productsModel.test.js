const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/db/connection');
const { productsModel } = require('../../../src/models');
const productsMock = require('../../mock/productModel.mock');

describe('Testa a camada Products model', function () {
      
    it('Verifica se lista todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const response = await productsModel.getAll();

      expect(response).to.be.deep.equal(productsMock);
    });
 
    it('Verifica se busca produto pelo Id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

      const response = await productsModel.getById(1);

      expect(response).to.be.deep.equal(productsMock[0]);
    });

  afterEach(function () { sinon.restore() });
});
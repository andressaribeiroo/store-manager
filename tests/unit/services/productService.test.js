const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const productsMock = require('../../mock/productModel.mock');
const { productsService } = require('../../../src/services');

describe('Verifica a camada Products Service', function () {

     
    it('Testa se todos os produtos são listados', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock);

      const response = await productsService.getAll();

      expect(response).to.be.deep.equal(productsMock);
    });
    
    it('Busca produto por um Id que não existe', async function () {
      const expected = { message: 'Product not found' };

      sinon.stub(productsModel, 'getById').resolves(undefined);

      const response = await productsService.getById(98);

      expect(response).to.be.deep.equal(expected);

    });

    it('Busca por um Id que existe', async function () {
      sinon.stub(productsModel, 'getById').resolves(productsMock[0]);

      const response = await productsService.getById(1);

      expect(response).to.be.deep.equal(productsMock[0]);
    });

    afterEach(function () { sinon.restore() });
  });


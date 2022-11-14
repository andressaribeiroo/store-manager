const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsService  = require('../../../src/services/productsServices');
const productsController = require('../../../src/controllers/productsController');
const productsMock = require('../../mock/productModel.mock');

describe('Testa a camada Products Controller', function () {
  
     it('Busca por todos os produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(productsMock);

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
  
  
    it('Busca pelo produto com Id existente', async function () {
      const req = { params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(productsMock[0]);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock[0]);
    });

    it('Busca pelo produto quando não exite Id', async function () {
      const req = { params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const serviceMessage = { message: 'Product not found' };

      sinon.stub(productsService, 'getById').resolves(serviceMessage);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(serviceMessage);
    });

    afterEach(function () { sinon.restore() });
  });

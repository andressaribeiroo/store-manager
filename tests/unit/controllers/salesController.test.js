const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController  = require('../../../src/controllers/salesController');
const salesMock = require('../../mock/salesMock');

describe('Testa a camada SalesController', function () {
  
    it('Verifica a busca por todas as vendas', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(salesMock);

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesMock);
    });
  
  it('Verifica a busca por vendas com id existente', async function () {
    const req = {
      params: {
        id: 1
      }
    };
    const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(salesMock);

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesMock);
    });
  
    it('Verifica se faz a inserção de novas vendas', async function () {
      const req = {
        body: [
          {
            productId: 1,
            quantity: 2
          },
          {
            productId: 2,
            quantity: 2
          }
        ]
      };
      const res = {};
      const insertSaleId = 3;
      const response = { id: insertSaleId, itemsSold: req.body };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'postSale').resolves(response);

      await salesController.postSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(response);
    });

    it('Verifica se é possivel inserir novas vendas sem o id do produto', async function () {
      const req = {
        body: [
          {
            quantity: 1
          },
        ]
      };
      const res = {};
      const message = { message: 'Product not found' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'postSale').resolves(message);

      await salesController.postSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(message);
    });

    afterEach(function () { sinon.restore() });
  });

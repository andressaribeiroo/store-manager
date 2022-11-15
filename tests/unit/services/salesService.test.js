const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const salesModel  = require('../../../src/models/salesModel');
const salesService  = require('../../../src/services/salesService');
const salesMock = require('../../mock/salesMock');
const productsService = require('../../../src/services/productsServices')



describe('Testa a camada SalesService', function () {
  
  it('Verifica se possui a lista de todas as vendas', async function () {
      sinon.stub(salesModel, 'getAll').resolves(salesMock);
      const response = await salesService.getAll();
      expect(response).to.be.deep.equal(salesMock);

    });
  
  it('Verifica se realiza a busca de uma venda pelo Id', async function () {
     const saleId = 1;
 
      sinon.stub(salesModel, 'getById').resolves(salesMock);
      const response = await salesService.getById(saleId);
      expect(response).to.be.deep.equal(salesMock);

    });

    it('Testa se ao receber um id invalido retorna mensagem de erro', async function () {
      const saleId = 5;
      const saleDub = [];

      sinon.stub(salesModel, 'getById').resolves(saleDub);

      const response = await salesService.getById(saleId);

      expect(response).to.be.deep.equal({ message: 'Sale not found' });

    });

    it('Tenta cadastrar uma nova venda na tabela sales quando os Ids dos produtos não existem', async function () {
      const salesItems = [
        {
          "productId": -25,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 2
        }
      ];

      sinon
        .stub(productsService, 'getById')
        .onFirstCall()
        .resolves(null)
        .onSecondCall()
        .resolves(salesItems[1]);

      const response = await salesService.postSale(salesItems);
      expect(response).to.be.deep.equal({ message: 'Product not found' });
    });

    afterEach(function () { sinon.restore() });
  });



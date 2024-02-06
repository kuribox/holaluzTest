const request = require('supertest');
const fs = require('fs');
const app = require('./index');

jest.mock('fs', () => {
  return {
    promises: {
      readFile: jest.fn()
    }
  };
});

describe('Test /clients/info Endpoint', () => {
    it('should return offers with a discount when applicable', async () => {
        fs.promises.readFile.mockImplementation((path) => {
          if (path.includes('clients.json')) {
            return Promise.resolve(JSON.stringify([{ cups: '1234', building_type: 'house' }]));
          }
          if (path.includes('supply-points.json')) {
            return Promise.resolve(JSON.stringify([
                { cups: '1234', neighbors: ['5678'], power: { p1: 5, p2: 10 } },
                { cups: '5678', neighbors: ['1234'], power: { p1: 1, p2: 1 } }
            ]));
          }
          return Promise.reject(new Error('File not found'));
        });
    
        const response = await request(app)
          .post('/clients/info')
          .send({ cups: '1234' });
    
        expect(response.body.offers.discount).toBe(5);
    });

    it('should verify isRooftopRevolutionAllowed is true when conditions are met', async () => {
        fs.promises.readFile.mockImplementation((path) => {
            if (path.includes('clients.json')) {
            return Promise.resolve(JSON.stringify([{ cups: '1234', building_type: 'house' }]));
            }
            if (path.includes('supply-points.json')) {
            return Promise.resolve(JSON.stringify([
                { cups: '1234', neighbors: ['5678'], power: { p1: 5, p2: 10 } },
                { cups: '5678', neighbors: ['1234'], power: { p1: 1, p2: 1 } }
            ]));
            }
            return Promise.reject(new Error('File not found'));
        });
    
        const response = await request(app)
            .post('/clients/info')
            .send({ cups: '1234' });
    
        expect(response.body.offers.isRooftopRevolutionAllowed).toBe(true);
    });

    it('should verify isRooftopRevolutionAllowed is false when conditions are met', async () => {
        fs.promises.readFile.mockImplementation((path) => {
            if (path.includes('clients.json')) {
            return Promise.resolve(JSON.stringify([{ cups: '1234', building_type: 'other' }]));
            }
            if (path.includes('supply-points.json')) {
            return Promise.resolve(JSON.stringify([
                { cups: '1234', neighbors: ['5678'], power: { p1: 5, p2: 10 } },
                { cups: '5678', neighbors: ['1234'], power: { p1: 1, p2: 1 } }
            ]));
            }
            return Promise.reject(new Error('File not found'));
        });
    
        const response = await request(app)
            .post('/clients/info')
            .send({ cups: '1234' });
    
        expect(response.body.offers.isRooftopRevolutionAllowed).toBe(false);
    });

    it('should return correct clientInfo and supplyPointInfo structure', async () => {
        const response = await request(app)
          .post('/clients/info')
          .send({ cups: '1234' });
    
        expect(response.body.clientInfo).toBeDefined();
        expect(response.body.supplyPointInfo).toBeDefined();
    });

    it('should return offers with no discount when not applicable', async () => {
        fs.promises.readFile.mockImplementation((path) => {
          if (path.includes('clients.json')) {
            return Promise.resolve(JSON.stringify([{ cups: '1234', building_type: 'house' }]));
          }
          if (path.includes('supply-points.json')) {
            return Promise.resolve(JSON.stringify([
                { cups: '1234', neighbors: ['5678'], power: { p1: 20, p2: 40 } },
                { cups: '5678', neighbors: ['1234'], power: { p1: 25, p2: 1 } }
            ]));
          }
          return Promise.reject(new Error('File not found'));
        });
      
        const response = await request(app)
          .post('/clients/info')
          .send({ cups: '1234' });
      
        expect(response.body.offers.discount).toBe(0);
    });
});


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const PORT = 3000;
const ROOFTOP_REVOLUTION_BUILDING_TYPES = ['house'];

app.use(bodyParser.json());
app.use(cors());

async function getClients(cups) {
  try {
    const clients = await fs.readFile('./data/clients.json', 'utf-8');
    return clients ? JSON.parse(clients).find(client => client.cups === cups) : null;
  } catch (error) {
    console.error('Error consulting clients:', error);
    throw error;
  }
}

async function getSupplyPoints(cups) {
  try {
    const supplyPoints = await fs.readFile('./data/supply-points.json', 'utf-8');
    return supplyPoints ? JSON.parse(supplyPoints).find(supplyPoint => supplyPoint.cups === cups) : null;
  } catch (error) {
    console.error('Error consulting supply points:', error);
    throw error;
  }
}

const haveDiscount = async (supplyPointInfo) => {
  if (supplyPointInfo.neighbors?.length > 0) {

    const neighborPromises = supplyPointInfo.neighbors.map(async (neighbor) => {
      const neighborSupplyPointInfo = await getSupplyPoints(neighbor);

      if (!neighborSupplyPointInfo) {
        return false;
      }

      if (neighborSupplyPointInfo.power?.p1 >= supplyPointInfo.power?.p1 || neighborSupplyPointInfo.power?.p2 >= supplyPointInfo.power?.p2) {
        return false;
      }

      return true;
    });

    const results = await Promise.all(neighborPromises);

    return results.every(result => result);
  }

  return false;
}

app.post('/clients/info', async (req, res) => {
  try {
    const { cups } = req.body;

    if (!cups) {
      return res.status(400).json({ error: 'The "cups" parameter is required' });
    }

    const clientInfo = await getClients(cups);
    const supplyPointInfo = await getSupplyPoints(cups);

    const offers = {
      isRooftopRevolutionAllowed: ROOFTOP_REVOLUTION_BUILDING_TYPES.includes(clientInfo.building_type) && supplyPointInfo.neighbors.length >= 1,
      discount: await haveDiscount(supplyPointInfo) ? 5 : 0,
    }

    const result = {
      clientInfo,
      supplyPointInfo,
      offers
    };

    res.json(result);
  } catch (error) {
    console.error('Error getting client info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
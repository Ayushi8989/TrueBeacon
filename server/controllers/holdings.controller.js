import { readJSON } from '../util/readJson.js';

const getHoldingsResponse = async (req, res) => {
    const holdings = readJSON("holdings.json");
    res.json(holdings);
}

export { getHoldingsResponse };
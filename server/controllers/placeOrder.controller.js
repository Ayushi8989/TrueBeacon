import { readJSON } from '../util/readJson.js';

const placeOrder = async (req, res) => {
    const order = readJSON("place_order_response.json");
    res.json(order);
}

export { placeOrder };
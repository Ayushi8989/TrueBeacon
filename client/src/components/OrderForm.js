"use client";

import { useState } from "react";
import { placeOrder } from "@/lib/api";
import InputField from "./InputField";
import Button from "./Button";

export default function OrderForm() {
    const [orderSymbol, setOrderSymbol] = useState("");
    const [orderQuantity, setOrderQuantity] = useState("");
    const [orderPrice, setOrderPrice] = useState("");
    const [orderMessage, setOrderMessage] = useState("");

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setOrderMessage("");

        if (!orderSymbol || !orderQuantity || !orderPrice) {
            setOrderMessage("All fields are required!");
            return;
        }

        try {
            const response = await placeOrder({
                symbol: orderSymbol,
                quantity: Number(orderQuantity),
                price: Number(orderPrice),
            });
            const orderid = response.data.order_id
            setOrderMessage(`${response.data.message}, your order ID: ${orderid}`);

            // Reset form fields
            setOrderSymbol("");
            setOrderQuantity("");
            setOrderPrice("");
        } catch (error) {
            setOrderMessage("Failed to place order. " + error.message);
        }
    };

    return (
        <div className="order-container">
            <h2>Place an Order</h2>
            <form onSubmit={handleOrderSubmit} className="order-form">
                <label>
                    Symbol:
                    <InputField
                        type="text"
                        name="symbol"
                        placeholder="Enter Symbol"
                        value={orderSymbol}
                        onChange={(e) => setOrderSymbol(e.target.value)}
                    />
                </label>

                <label>
                    Quantity:
                    <InputField
                        type="number"
                        name="quantity"
                        placeholder="Enter Quantity"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(e.target.value)}
                    />
                </label>

                <label>
                    Price:
                    <InputField
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        value={orderPrice}
                        onChange={(e) => setOrderPrice(e.target.value)}
                    />
                </label>

                <Button label="Submit" onClick={handleOrderSubmit} />
            </form>

            {orderMessage && <p className="order-message">{orderMessage}</p>}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";

export default function DummyPrice() {
  const [prices, setPrices] = useState([]);
  const [cgColor, setgColor] = useState('black')
  const [ciColor, setiColor] = useState('black')
  const [loading, setLoading] = useState(true);

  const wsurl = process.env.WEB_SOCKET_URL;

  useEffect(() => {
    const socket = new WebSocket(wsurl);

    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server");
      
    });

    socket.addEventListener("message", (event) => {
      const newPriceData = JSON.parse(event.data);
      newPriceData.forEach(item => {
        console.log(item.symbol);
        if (item.symbol === "GOLDBEES") {
          if (item.price >= 40.67) {
            setgColor('green');
          } else {
            setgColor('red');
          }
        }
        if (item.symbol === "IDEA") {
          if (item.price >= 8.466) {
            setiColor('green');
          } else {
            setiColor('red');
          }
        }
      });
      setPrices(newPriceData);
      setLoading(false);
    });

    return () => {
      socket.close();
      console.log("WebSocket connection closed");
    };
  }, []);

  return (
    <div className="dummy-price">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {prices.map((item, index) => (
              <li key={index} style={{ color: item.symbol === "GOLDBEES" ? cgColor : item.symbol === "IDEA" ? ciColor : 'black' }}>
                {item.symbol}: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

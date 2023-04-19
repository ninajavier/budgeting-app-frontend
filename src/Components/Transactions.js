import React from "react";
import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((response) => setTransactions(response.data))
      .catch((e) => console.error("catch", e));
  }, []);

  let bankAccountTotal = 0;

  function calculateAccountTotal() {
    for (const transaction of transactions) {
      if (transaction.type === "deposit") {
        bankAccountTotal += transaction.amount;
      } else if (transaction.type === "withdrawal") {
        bankAccountTotal -= transaction.amount;
      }
    }
  }

  calculateAccountTotal();

  let color = "#000000"; // default color

  if (bankAccountTotal > 100) {
    color = "#00ff00"; // greenish color
  } else if (bankAccountTotal >= 0) {
    color = "#ffff00"; // yellowish color
  } else {
    color = "#ff0000"; // reddish color
  }

  return (
    <div className="Transactions">
      <section>
        <table>
          <thead>
          <th>
              Bank Account Total:{" "}
              <span style={{ color: color }}>{bankAccountTotal}</span>
            </th>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <Transaction
                  key={index}
                  transaction={transaction}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

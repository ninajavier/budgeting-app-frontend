import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Form.css";

const API = process.env.REACT_APP_API_URL;

export default function TransactionNewForm() {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState(null);

  const [transaction, setTransaction] = useState({
    item_name: "",
    from: "",
    category: "",
    amount: 0,
    type: selectedType,
    date: "",
  });

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const addTransaction = (newTransaction) => {
    axios
      .post(`${API}/transactions`, newTransaction)
      .then(() => {
        navigate("/transactions");
      })
      .catch((c) => console.error("catch", c));
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedType(value === selectedType ? null : value);
    setTransaction({ ...transaction, type: value });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setTransaction({ ...transaction, category: value });
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setTransaction({ ...transaction, date: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transaction);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="item_name">Item Name:</label>
        <input
          id="item_name"
          value={transaction.item_name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Item"
          required
        />
        <br />

        <label htmlFor="from">Where Item is From:</label>
        <input
          id="from"
          type="text"
          value={transaction.from}
          onChange={handleTextChange}
        />
        <br />

        <label for="category">Choose a Category:</label>
        <select id="category" name="category" onChange={handleCategoryChange}>
          <option value="Food">Food</option>
          <option value="Auto">Auto</option>
          <option value="Income">Income</option>
          <option value="Shopping">Shopping</option>
          <option value="Pet">Pet Supplies</option>
          <option value="Other">Other</option>
        </select>
        <br />

        <label htmlFor="amount">Transaction Amount:</label>
        <input
          id="amount"
          type="number"
          value={transaction.amount}
          onChange={handleTextChange}
        />
        <br />

        <label for="deposit">
          Deposit
          <input
            type="checkbox"
            name="type"
            value="deposit"
            checked={selectedType === "deposit"}
            onClick={handleCheckboxChange}
          />
        </label>
        <label for="withdrawal">
          Withdrawal
          <input
            type="checkbox"
            name="type"
            value="withdrawal"
            checked={selectedType === "withdrawal"}
            onClick={handleCheckboxChange}
          />
        </label>
        <br />
        <label htmlFor="date">Date of Transaction:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={transaction.date}
          onChange={handleDateChange}
        />
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

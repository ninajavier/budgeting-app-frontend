import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export default function TransactionEditForm() {
  const navigate = useNavigate();
  let { index } = useParams();
  
  const [selectedType, setSelectedType] = useState(null);

  const [transaction, setTransaction] = useState({
    item_name: "",
    from: "",
    category: "",
    amount: 0,
    type: selectedType,
    date: "",
  });


  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => console.error("catch", e));
  }, [index]);

  const editTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
      })
      .catch((e) => console.warn("warn", e));
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

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editTransaction();
  };
  return (
    <div className="Edit">
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
        <label htmlFor="withdrawal">
          Withdrawal
          <input
            type="radio"
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
      <Link to={`/transactions/${index}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}

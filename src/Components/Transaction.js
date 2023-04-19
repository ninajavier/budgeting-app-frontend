import { Link } from "react-router-dom";

export default function Transaction({ transaction, index }) {

  return (
    <tr>
      <td>{transaction.date}</td>
      <td><Link to={`/transactions/${index}`}>{transaction.item_name}</Link></td>
      <td>{transaction.type === 'withdrawal' ? '-' + transaction.amount : transaction.amount}</td>
    </tr>
  );
}

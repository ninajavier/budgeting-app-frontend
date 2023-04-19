import { Link,  } from "react-router-dom";



export default function Home() {
    return (
        <div>
           <Link to={`/transactions`}>
            <button>Check Your Transactions</button>
          </Link>
        </div>
    );
}


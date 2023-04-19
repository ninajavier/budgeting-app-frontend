import React from 'react';
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
          <h1>Budget App</h1> 
          <Link to='/transactions/new'>New Transaction</Link>
        </nav>
    );
}


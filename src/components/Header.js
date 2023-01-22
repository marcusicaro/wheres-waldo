import React from "react";
import { Link } from "react-router-dom";

import "../Assets/styles/Header.css";

export default function Header() {
  return (
    <header>
      <p>
        <Link to='/'>Home</Link>
      </p>
      <h1>Header</h1>
    </header>
  );
}

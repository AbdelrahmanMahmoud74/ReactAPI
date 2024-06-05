import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function TopBar() {
  return (
    <div className="container d-row shadow">
      <h1>ABd0Store</h1>
      <Link to="/" className="btn-nav">
        Go To Website!
      </Link>
    </div>
  );
}
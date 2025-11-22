import { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./Header.css";
import hanger from "../images/hanger.svg";
import dropdown from "../images/dropdown.svg";
import plus from "../images/plus.svg";

export enum Seasons {
  Winter,
  Spring,
  Summer,
  Fall,
}

export default function Header() {
  /* Find the current season and set as state variable */
  const month: number = new Date().getMonth();
  const currSzn: number = Math.floor(month / 3);
  const [season, setSeason] = useState(Seasons[currSzn]);

  return (
    <div className="navbar">
      <div className="title">
        <Link to="/">
          <h1>Cher's Wardrobe</h1>
          <img src={hanger} />
        </Link>
      </div>
      <div className="blue button">
        <img src={dropdown} />
        {season} Season
      </div>
      <div className="pink button">
        <Link to="/add_item">
          <img src={plus} />
          Add Item
        </Link>
      </div>
    </div>
  );
}

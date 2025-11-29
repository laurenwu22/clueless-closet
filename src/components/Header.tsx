import { BrowserRouter, Link } from "react-router-dom";
import "./Header.css";
import hanger from "../images/hanger.svg";
import dropdown from "../images/dropdown.svg";
import plus from "../images/plus.svg";
import back from "../images/back.svg";

type HeaderProps = {
  season?: string;
  page: string;
};

export default function Header({ season, page }: HeaderProps) {
  return (
    <div className="navbar">
      <div className="title">
        <Link to="/">
          <h1>Cher's Wardrobe</h1>
          <img src={hanger} />
        </Link>
      </div>
      {page === "home" ? (
        <>
          <div className="blue button">
            <img src={dropdown} />
            {season} Season
          </div>
          <div className="txt-btn">
            <Link to="/all-outfits">All Outfits</Link>
          </div>
          <div className="pink button">
            <Link to="/add-item">
              <img src={plus} className="plus" />
              Add Item
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="pink button">
            <Link to="/">
              <img src={back} />
              Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

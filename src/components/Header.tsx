import { Link } from "react-router-dom";
import "./Header.css";
import hanger from "../images/hanger.svg";
import dropdown from "../images/dropdown.svg";
import plus from "../images/plus.svg";
import back from "../images/back.svg";
import { useState } from "react";
import type { Season } from "../types/clothing";

type HeaderProps = {
  season?: string;
  page: string;
  setSeason?: React.Dispatch<React.SetStateAction<Season>>;
};

export default function Header({ season, page, setSeason }: HeaderProps) {
  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <div className="navbar">
      <div className="title">
        <Link to="/">
          <h1>Cher's Wardrobe</h1>
          <img src={hanger} />
        </Link>
      </div>
      {page === "home" && (
        <>
          <div
            className="dropdown"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="blue button">
              <img src={dropdown} />
              {season} Season
            </div>
            {hovering && (
              <div className="menu">
                {["Winter", "Spring", "Summer", "Fall"].map((seasonName) => (
                  <div
                    className="menu-item"
                    onClick={() => setSeason?.(seasonName as Season)}
                  >
                    {seasonName}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="right">
            <div className="active txt-btn">
              <Link to="/">Home</Link>
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
          </div>
        </>
      )}
      {page === "add" && (
        <>
          <div className="pink button">
            <Link to="/">
              <img src={back} />
              Back
            </Link>
          </div>
        </>
      )}
      {page === "all-outfits" && (
        <>
          <div className="right">
            <div className="txt-btn">
              <Link to="/">Home</Link>
            </div>
            <div className="txt-btn active">
              <Link to="/all-outfits">All Outfits</Link>
            </div>
            <div className="pink button">
              <Link to="/add-item">
                <img src={plus} className="plus" />
                Add Item
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

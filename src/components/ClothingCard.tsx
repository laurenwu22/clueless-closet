import "./ClothingCard.css";
import { useState } from "react";
import Trash from "../images/trash.svg";
import Lock from "../images/lock.svg";
import Unlock from "../images/unlock.svg";

interface ClothingCardProps {
  image: string;
  alt: string;
  locked: boolean;
  setLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ClothingCard({
  image,
  alt,
  locked,
  setLocked,
}: ClothingCardProps) {
  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <div
      className="center-photo"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={`overlay ${hovering ? "visible" : ""}`}>
        <img className="hover-btn" src={Trash} alt="delete item" />
        {locked ? (
          <img
            className="hover-btn"
            src={Lock}
            alt="unlock item"
            onClick={() => setLocked(false)}
          />
        ) : (
          <img
            className="hover-btn"
            src={Unlock}
            alt="lock item"
            onClick={() => setLocked(true)}
          />
        )}
      </div>
      <img src={image} alt={alt} />
      {locked && <img src={Lock} alt="lock indicator" className="lock" />}
    </div>
  );
}

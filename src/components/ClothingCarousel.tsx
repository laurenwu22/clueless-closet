import "./ClothingCarousel.css";
import leftArrow from "../images/left-arrow.svg";
import rightArrow from "../images/right-arrow.svg";
import type { ClothingItem } from "../types/clothing";
import { useEffect, useState } from "react";

interface CarouselProps {
  clothes: ClothingItem[];
  index?: number;
  locked?: boolean;
}

export default function ClothingCarousel({ clothes }: CarouselProps) {
  // State var to track current clothing index
  const numClothes: number = clothes.length;
  const [index, setIndex] = useState(() => (numClothes === 1 ? 0 : 1));

  return (
    <div className="carousel-container">
      {clothes ? (
        <>
          {index > 0 ? (
            <img
              className="arrow"
              src={leftArrow}
              onClick={() => setIndex(index - 1)}
            />
          ) : (
            <img className="disabled arrow" src={leftArrow} />
          )}

          {index > 0 && numClothes > 1 ? (
            <img
              className="side-photo"
              src={clothes[index - 1].image}
              onClick={() => setIndex(index - 1)}
              alt={clothes[index - 1].name}
            />
          ) : (
            <div className="transparent side-photo" />
          )}

          <img
            className="center-photo"
            src={clothes[index].image}
            alt={clothes[index].name}
          />

          {index < numClothes - 1 ? (
            <img
              className="side-photo"
              src={clothes[index + 1].image}
              onClick={() => setIndex(index + 1)}
              alt={clothes[index + 1].name}
            />
          ) : (
            <div className="transparent side-photo" />
          )}

          {index < numClothes - 1 ? (
            <img
              className="arrow"
              src={rightArrow}
              onClick={() => setIndex(index + 1)}
            />
          ) : (
            <img className="disabled arrow" src={rightArrow} />
          )}
        </>
      ) : (
        <h2>Please enter more clothes to see this row</h2>
      )}
    </div>
  );
}

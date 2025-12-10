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
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const urlSet: string[] = clothes.map((c) => {
      if (c.image instanceof File) {
        return URL.createObjectURL(c.image);
      } else {
        return c.image;
      }
    });
    setUrls(urlSet);
  }, [clothes]);

  return (
    <div className="carousel-container">
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
          src={urls[index - 1]}
          onClick={() => setIndex(index - 1)}
          alt={clothes[index - 1].name}
        />
      ) : (
        <div className="transparent side-photo" />
      )}

      <img
        className="center-photo"
        src={urls[index]}
        alt={clothes[index].name}
      />

      {index < numClothes - 1 ? (
        <img
          className="side-photo"
          src={urls[index + 1]}
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
    </div>
  );
}

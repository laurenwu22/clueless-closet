import "./ClothingCarousel.css";
import leftArrow from "../images/left-arrow.svg";
import rightArrow from "../images/right-arrow.svg";
import type { ClothingItem } from "../types/clothing";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import ClothingCard from "./ClothingCard";

interface CarouselProps {
  clothes: ClothingItem[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  locked?: boolean;
}

export default function ClothingCarousel({
  clothes,
  index,
  setIndex,
}: CarouselProps) {
  // State var to track current clothing index
  const numClothes: number = clothes.length;
  const [urls, setUrls] = useState<string[]>([]);
  const [locked, setLocked] = useState<boolean>(false);

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

  if (!clothes.length || !urls.length) {
    return (
      <div className="carousel-container">
        <BounceLoader />
      </div>
    );
  }

  return (
    <div className="carousel-container">
      {index > 0 && !locked ? (
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

      <ClothingCard
        image={urls[index]}
        alt={clothes[index].name}
        locked={locked}
        setLocked={setLocked}
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

      {index < numClothes - 1 && !locked ? (
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

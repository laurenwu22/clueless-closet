import "./HomePage.css";
import Header from "../components/Header";
import ClothingCarousel from "../components/ClothingCarousel";
import type { ClothingItem } from "../types/clothing";
import { useState, useEffect } from "react";
import { addData, getAllItems } from "../utils/db";
import { type Season } from "../types/clothing";
import type { Outfit } from "../types/outfit";
import { BounceLoader } from "react-spinners";
import shirt from "../images/shirt.svg";
import Modal from "../components/Modal";

export const Seasons: Season[] = ["Winter", "Spring", "Summer", "Fall"];

export default function HomePage() {
  /* Find the current season and set as state variable */
  const month: number = new Date().getMonth();
  const currSzn: number = Math.floor(month / 3);
  const [season, setSeason] = useState<Season>(Seasons[currSzn]);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [top, setTop] = useState<number>(0);
  const [bottom, setBottom] = useState<number>(0);

  useEffect(() => {
    async function loadClothes() {
      const items: ClothingItem[] = await getAllItems<ClothingItem>("clothes");
      setClothes(items);
      setLoading(false);
    }
    loadClothes();
  }, []);

  const tops: ClothingItem[] = clothes
    .filter((c) => c.category === "top" && c.seasons.includes(season))
    .map((c) => c as ClothingItem);

  const bottoms: ClothingItem[] = clothes
    .filter((c) => c.category === "bottom" && c.seasons.includes(season))
    .map((c) => c as ClothingItem);

  useEffect(() => {
    setTop(tops.length === 1 ? 0 : 1);
    setBottom(bottoms.length === 1 ? 0 : 1);
  }, [tops.length, bottoms.length]);

  const addOutfit = async () => {
    const topID = tops[top].id;
    const bottomID = bottoms[bottom].id;

    if (topID == null || bottomID == null) {
      throw new Error("Error: item missing ID");
    }

    const newFit: Outfit = { itemIDs: [topID, bottomID] };
    await addData(newFit, "outfits");

    console.log("Outfit succesfully submitted with", topID, bottomID);
  };

  if (loading) {
    return (
      <div className="page-container">
        <BounceLoader />
      </div>
    );
  }

  return (
    <div>
        <Modal />
      <Header season={season} page="home" setSeason={setSeason} />
      <div className="page-container">
        <div className="clothes-container">
          {tops.length > 0 && (
            <ClothingCarousel clothes={tops} index={top} setIndex={setTop} />
          )}
          {bottoms.length > 0 && (
            <ClothingCarousel
              clothes={bottoms}
              index={bottom}
              setIndex={setBottom}
            />
          )}
        </div>
        <div className="pink button" onClick={addOutfit}>
          <img src={shirt} alt="shirt icon" />
          Save Outfit
        </div>
      </div>
    </div>
  );
}

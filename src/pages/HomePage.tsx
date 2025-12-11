import "./HomePage.css";
import Header from "../components/Header";
import ClothingCarousel from "../components/ClothingCarousel";
import clothesData from "../DummyData.json";
import type { ClothingItem } from "../types/clothing";
import { useState, useEffect } from "react";
import { getAllItems } from "../utils/db";
import { type Season } from "../types/clothing";

export const Seasons: Season[] = ["Winter", "Spring", "Summer", "Fall"];

export default function HomePage() {
  /* Find the current season and set as state variable */
  const month: number = new Date().getMonth();
  const currSzn: number = Math.floor(month / 3);
  const [season, setSeason] = useState<Season>(Seasons[currSzn]);
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadClothes() {
      const items = await getAllItems("clothes");
      setClothes(items);
      setLoading(false);
    }
    loadClothes();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

  const tops: ClothingItem[] = clothes
    .filter((c) => c.category === "top" && c.seasons.includes(season))
    .map((c) => c as ClothingItem);

  const bottoms: ClothingItem[] = clothes
    .filter((c) => c.category === "bottom" && c.seasons.includes(season))
    .map((c) => c as ClothingItem);

  return (
    <div>
      <Header season={season} page="home" setSeason={setSeason} />
      <div className="page-container">
        <div className="clothes-container">
          {tops.length > 0 && <ClothingCarousel clothes={tops} />}
          {bottoms.length > 0 && <ClothingCarousel clothes={bottoms} />}
        </div>
      </div>
    </div>
  );
}

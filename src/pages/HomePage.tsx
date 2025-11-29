import "./HomePage.css";
import Header from "../components/Header";
import ClothingCarousel from "../components/ClothingCarousel";
import clothesData from "../DummyData.json";
import type { ClothingItem } from "../types/clothing";
import { useState } from "react";

export enum Seasons {
  Winter,
  Spring,
  Summer,
  Fall,
}

export default function HomePage() {
  /* Find the current season and set as state variable */
  const month: number = new Date().getMonth();
  const currSzn: number = Math.floor(month / 3);
  const [season, setSeason] = useState<string>(Seasons[currSzn]);

  const tops: ClothingItem[] = clothesData.clothes
    .filter((c) => c.category === "top" && c.seasons.includes(season))
    .map((c) => c as ClothingItem);

  const bottoms: ClothingItem[] = clothesData.clothes
    .filter((c) => c.category === "bottom" && c.seasons.includes(season))
    .map((c) => c as ClothingItem);

  return (
    <div>
      <Header season={season} page="home" />
      <div className="page-container">
        <div className="clothes-container">
          <ClothingCarousel clothes={tops} />
          <ClothingCarousel clothes={bottoms} />
        </div>
      </div>
    </div>
  );
}

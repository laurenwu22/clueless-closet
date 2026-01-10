import "./AllOutfits.css";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { type Outfit } from "../types/outfit";
import { getAllItems } from "../utils/db";
import type { Season } from "../types/clothing";
import { Seasons } from "./HomePage";
import { BounceLoader } from "react-spinners";
import OutfitPanel from "../components/OutfitPanel";
import { deleteItem } from "../utils/db";
import Modal from "../components/Modal";

export default function AllOutfits() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* Find the current season and set as state variable */
  const month: number = new Date().getMonth();
  const currSzn: number = Math.floor(month / 3);
  const [season, setSeason] = useState<Season>(Seasons[currSzn]);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadOutfits() {
      const items: Outfit[] = await getAllItems<Outfit>("outfits");
      items.reverse();

      setOutfits(items);
      setLoading(false);
    }
    loadOutfits();
  }, []);

  /* Passed to child to delete outfit from db */
  const handleDelete = async (id: number) => {
    await deleteItem("outfits", id);
    setOutfits((prev) => prev.filter((outfit) => outfit.id !== id));
    setModal(true);
  };

  /* Return loading page while clothes have not loaded */
  if (loading) {
    return (
      <div>
        <Header page="all-outfits" season={season} setSeason={setSeason} />
        <BounceLoader />
      </div>
    );
  }

  return (
    <div>
      {modal && (
        <Modal
          text="Outfit successfully deleted"
          onClose={() => setModal(false)}
        />
      )}
      <Header page="all-outfits" season={season} setSeason={setSeason} />
      <div className="outfit-row">
        {outfits.map((outfit) => (
          <OutfitPanel
            key={outfit.id}
            id={outfit.id as number}
            ids={outfit.itemIDs}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

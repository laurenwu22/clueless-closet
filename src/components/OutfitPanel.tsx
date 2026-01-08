import type { ClothingItem } from "../types/clothing";
import { getItem } from "../utils/db";
import { useEffect, useState } from "react";
import "./OutfitPanel.css";
import { BounceLoader } from "react-spinners";
import Trash from "../images/trash.svg"

export default function OutfitPanel({ ids }: { ids: number[] }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    const loadItems = async () => {
      const result: ClothingItem[] = await Promise.all(
        ids.map(async (id) => await getItem<ClothingItem>("clothes", id)),
      );
      setItems(result);
    };
    loadItems();
    setLoading(false);
  }, [ids]);

  const normalizeImage = (image: File | string): string => {
    if (typeof image === "string") {
      return image;
    }

    return URL.createObjectURL(image);
  };

  if (loading) {
    return <BounceLoader className="loader" />;
  }

  return (
    <div
      className="outfit-container"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {items.map((item) => (
        <img
          key={item.name}
          src={normalizeImage(item.image)}
          className="image"
        />
      ))}
      <div className={`overlay ${hovering ? "visible" : ""}`}>
        <img src={Trash} className="hover-btn"/>
      </div>
    </div>
  );
}

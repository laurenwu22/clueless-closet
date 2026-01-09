import type { ClothingItem } from "../types/clothing";
import { getItem } from "../utils/db";
import { useEffect, useState } from "react";
import "./OutfitPanel.css";
import { BounceLoader } from "react-spinners";
import Trash from "../images/trash.svg";

interface OutfitPanelProps {
  id: number;
  ids: number[];
  onDelete: (id: number) => void;
}

export default function OutfitPanel({ id, ids, onDelete }: OutfitPanelProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [hovering, setHovering] = useState<boolean>(false);

  const loadItems = async () => {
    setLoading(true);

    const result = await Promise.all(
      ids.map((id) => getItem<ClothingItem>("clothes", id)),
    );

    setItems(result);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
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
          key={item.id}
          src={normalizeImage(item.image)}
          className="image"
        />
      ))}
      <div className={`overlay ${hovering ? "visible" : ""}`}>
        <img src={Trash} className="hover-btn" onClick={() => onDelete(id)} />
      </div>
    </div>
  );
}

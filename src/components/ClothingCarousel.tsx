import "./ClothingCarousel.css"
import leftArrow from "../images/left-arrow.svg"
import rightArrow from "../images/right-arrow.svg"
import type { ClothingItem } from "../types/clothing";
import { useEffect, useState } from "react";

interface CarouselProps {
    clothes: ClothingItem[];
    index?: number;
    locked?: boolean;
}

export default function ClothingCarousel({clothes} : CarouselProps) {
    // State var to track current clothing index
    const numClothes : number = clothes.length;
    const [index, setIndex] = useState(Math.floor(Math.random() * numClothes));

    // Ensure all clothes are shown if numClothes is 3 or fewer
    useEffect (() => {
        if (numClothes > 1 && numClothes <= 3) {
            setIndex(1);
        }
    })

    return (
        <div className="carousel-container">
            <img className="arrow" src={leftArrow} onClick={() => setIndex(index - 1)}/>
            {(index > 0 && numClothes > 1) ?
                <img className="side-photo" src={clothes[index - 1].image}/>
                :
                <div className="side-photo" />
            }
            <img className="center-photo" src={clothes[index].image}/>
            {(index < (numClothes - 1)) ?
                <img className="side-photo" src={clothes[index + 1].image}/>
                :
                <div className="side-photo" />
            }
            <img className="arrow" src={rightArrow} onClick={() => setIndex(index + 1)}/>
        </div>
    )
}
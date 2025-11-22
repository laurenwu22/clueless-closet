import "./ClothingCarousel.css"
import leftArrow from "../images/left-arrow.svg"
import rightArrow from "../images/right-arrow.svg"

export default function ClothingCarousel() {
    return (
        <div className="carousel-container">
            <img className="arrow" src={leftArrow}/>
            <div className="side-photo"></div>
            <div className="center-photo"></div>
            <div className="side-photo"></div>
            <img className="arrow" src={rightArrow}/>
        </div>
    )
}
import "./HomePage.css";
import Header from "../components/Header";
import ClothingCarousel from "../components/ClothingCarousel";
import clothesData from "../DummyData.json"

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="page-container">
        <div className="clothes-container">
          <ClothingCarousel />
          <ClothingCarousel />
          <ClothingCarousel />
        </div>
      </div>
    </div>
  );
}

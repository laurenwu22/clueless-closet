import Header from "../components/Header";
import "./AddItem.css";
import image from "../images/img.svg";
import shirt from "../images/shirt.svg";
import { useState, type ChangeEvent } from "react";

export default function AddItem() {
  const [imgURL, setimgURL] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setimgURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setimgURL(event.target.value);
    }
  };

  return (
    <div>
      <Header page="add" />
      <div className="add-form">
        <h1>Add Clothing Item</h1>
        <div className="btn-container">
          {imgURL === null ? (
            <>
              <label htmlFor="add-image" className="img-btn">
                <input
                  type="file"
                  id="add-image"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
                <img src={image} />
                <p>Select File</p>
              </label>
              <p>or</p>
              <label htmlFor="img-link" className="txt-container">
                <p>Image Link</p>
                <input
                  type="text"
                  id="img-link"
                  placeholder="Paste image URL"
                  onBlur={handleLinkChange}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                />
              </label>
            </>
          ) : (
            <>
              <img src={imgURL} className="img-preview" />
              <div onClick={() => setimgURL(null)} className="clickable">
                Change Photo
              </div>
            </>
          )}
          <label htmlFor="description" className="txt-container">
            <p>Description</p>
            <input
              type="text"
              id="description"
              placeholder="Ex: floral sundress"
            />
          </label>
          <div className="categories">
            <p>Category</p>
            <label>
              <input type="radio" name="category" value="Top" />
              Top
            </label>
            <label>
              <input type="radio" name="category" value="Bottom" />
              Bottom
            </label>
          </div>
          <div className="categories">
            <p>Seasons</p>
            <label>
              <input type="checkbox" name="category" value="Winter" />
              Top
            </label>
            <label>
              <input type="checkbox" name="category" value="Spring" />
              Spring
            </label>
            <label>
              <input type="checkbox" name="category" value="Summer" />
              Summer
            </label>
            <label>
              <input type="checkbox" name="category" value="Fall" />
              Fall
            </label>
          </div>
          <div className="save-btn">
            <img src={shirt} />
            Save Item
          </div>
        </div>
      </div>
    </div>
  );
}

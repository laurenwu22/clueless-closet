import Header from "../components/Header";
import "./AddItem.css";
import image from "../images/img.svg";
import shirt from "../images/shirt.svg";
import { useState, type ChangeEvent } from "react";
import { addClothes } from "../utils/db";
import { type Category, type ClothingItem, type Season } from "../types/clothing";
import check from "../images/check.svg"
import { Link } from "react-router-dom";

export default function AddItem() {
  const [imgURL, setimgURL] = useState<string | null>(null);
  const [img, setImg] = useState<File | string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [category, setCategory] = useState<Category>("top");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setimgURL(URL.createObjectURL(event.target.files[0]));
      setImg(event.target.files[0]);
    }
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
        setimgURL(event.target.value);
        setImg(event.target.value);
    }
  };

  const handleSeasonCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSeasons((prev) => [...prev, value as Season]);
    } else {
      setSeasons((prev) => prev.filter((s) => s !== value));
    }
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!img) newErrors.img = "Please provide an image file or link";
    if (!desc) newErrors.desc = "Please provide a description";
    if (seasons.length === 0)
      newErrors.seasons = "Please select at least one season";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitItem = async () => {
    if (!validateForm()) return;
    const newClothing : ClothingItem = {
      "name": desc!,
      "category": category,
      "seasons": seasons,
      "image": img!
    }
    await addClothes(newClothing);
    setSubmitted(true);
  };

  return (
    <div>
      <Header page="add" />
      <div className="add-form">
        {submitted ?
        <div className="submitted">
            <img src={check}/>
            <p><i>{desc}</i></p>
            <p>sucessfully added</p>
            <div className="btns">
                <Link to="/">
                <div className="blue btn">
                    Return Home
                </div>
                </Link>
                <Link to="/add-item" reloadDocument>
                <div className="pink btn">
                    Add New Item
                </div>
                </Link>
            </div>
        </div>
        :
        <>
        <div className="btn-container">
          {imgURL === null ? (
            <>
              {errors["img"] && <div className="error">{errors["img"]}</div>}
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
            {errors["desc"] && <div className="error">{errors["desc"]}</div>}
            <p>Description</p>

            <input
              type="text"
              id="description"
              placeholder="Ex: floral sundress"
              onChange={(e) => setDesc(e.currentTarget.value)}
            />
          </label>
          <div className="categories">
            <p>Category</p>
            <label>
              <input
                type="radio"
                name="category"
                value="Top"
                defaultChecked
                onClick={() => setCategory("top")}
              />
              Top
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Bottom"
                onClick={() => setCategory("bottom")}
              />
              Bottom
            </label>
          </div>
          <div className="categories">
            {errors["seasons"] && (
              <div className="error">{errors["seasons"]}</div>
            )}
            <p>Seasons</p>
            <label>
              <input
                type="checkbox"
                name="category"
                value="Winter"
                onChange={handleSeasonCheck}
              />
              Winter
            </label>
            <label>
              <input
                type="checkbox"
                name="category"
                value="Spring"
                onChange={handleSeasonCheck}
              />
              Spring
            </label>
            <label>
              <input
                type="checkbox"
                name="category"
                value="Summer"
                onChange={handleSeasonCheck}
              />
              Summer
            </label>
            <label>
              <input
                type="checkbox"
                name="category"
                value="Fall"
                onChange={handleSeasonCheck}
              />
              Fall
            </label>
          </div>
          <div className="pink btn" onClick={submitItem}>
            <img src={shirt} />
            Save Item
          </div>
        </div>
        </>
        }
      </div>
    </div>
  );
}

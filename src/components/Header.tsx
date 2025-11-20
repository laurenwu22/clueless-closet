import {useState} from "react"
import "./Header.css"
import hanger from "../images/hanger.svg"
import dropdown from "../images/dropdown.svg"
import plus from "../images/plus.svg"

export enum Seasons {'Winter', 'Spring', 'Summer', 'Fall'}

export default function Header () {

    
    return (
        <div className="navbar">
            <div className="title">
                <a href="/">
                    <h1>Cher's Wardrobe</h1>
                    <img src={hanger}/>
                </a>
            </div>
            <div className="blue button">
                <img src={dropdown}/>
                {Seasons[0]} Season
            </div>
            <div className="pink button">
                <img src={plus}/>
                Add Item
            </div>
        </div>
    )
}
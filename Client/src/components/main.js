import React,{useState} from "react";
import "./main.css";
import Vector from "../assets/Vector.png";
import main_img from "../assets/main_page_image.png";
import iconbase from "../assets/iconbase.png";
import { Route,useNavigate } from "react-router-dom";
import TrustchainLogo from "../assets/TrustchainLogo.png";

export default function Mainpage() {
    let navigate = useNavigate();

    return(
        
    <div className="Landing-page">
        
        <header>
            <nav className="left-section">
                <ul className="nav-left">
                    <li><span><img src={`${Vector}`} className="TrustchainLogo"></img></span></li>
                    <li><a href="/#">Home</a></li>       
                    <li><a href="/#">Components</a></li>       
                    <li><a href="/#">Pages</a></li>       
                    <li><a href="https://github.com/Adhav712/SupplyChain_Miniproject#readme" target={"_blank"}>Documentation</a></li>                   
                </ul>
            </nav>
            <nav className="right-section">
                <ul className="nav-right">
                    <li><span className="iconify" data-icon="bx:search"></span></li>
                    <li><span className="iconify" data-icon="iconoir:internet"></span></li>
                    <li><span style={{color:"#919EAB"}}>|</span></li>
                    <li><a href="" onClick={()=> navigate('Login')}>Login</a></li>
                    <li><a className="btnsjoin" href="https://docs.google.com/forms/d/e/1FAIpQLSd-mw7VTIk-IQh3JvlSkDy6dQnnhfYlvYGoePfSpUrzNbqvNw/viewform?usp=sf_link" target={"_blank"}>Join us</a></li>
                </ul>
            </nav>
        </header>
        <aside className="Mid-section">
             <article className="Mid-section-left">
                <div className="mid-section-hed">
                    <p className="Mid-sec_hed1">Check Your Product integrity Signup today <span className="Mid-sec_hed2">Trustchain</span></p>    
                </div>            
                <div className="Mid-sec-subsec1">
                    Enter your product name to check path of history your product  
                </div>
                <div className="Mid-sec-subsec2" onClick={()=> navigate('UserQuery')}>
                    <p className="Mid-sec-subsec2-buttontext"> Product history</p>
                    <span ><img src={`${iconbase}`} id ="Mid-sec-subsec2-icon" ></img></span>
                </div>    
             </article> 
             <article>
                <img src={`${main_img}`} ></img>
           </article>
        </aside> 
    </div>
        
    ) 
}
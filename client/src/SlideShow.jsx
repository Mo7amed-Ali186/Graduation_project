import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    overflow: 'hidden',
    height: "400px",
    width: "auto",
    backgroundPosition: "center",
  
};

export const Slideshow = (slideImages) => {
    return (
        <div className="slide-container" >
            <Slide  >
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div className="center-backgroundPosition"
                            style={{
                                ...divStyle,
                                backgroundImage: `url(${slideImage.secure_url})`,
                            }}
                        ></div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

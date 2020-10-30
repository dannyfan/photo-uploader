import React from "react";
import "./Canvas.scss";

const Canvas = (props) => {
  const imageDraw = () => {
    props.setStartTransform(true);
  };

  return (
    <div className="Canvas">
      <img src={props.image} alt="" onLoad={imageDraw} />
      {props.finalImage ? (
        <img src={props.finalImage} alt="" />
      ) : props.image ? (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" />
        </svg>
      ) : (
        <p>Upload an image first</p>
      )}
    </div>
  );
};

export default Canvas;

import React from "react";
import "./card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="imgpage">
        <img src={props.data.image} alt={props.data.title} />
      </div>
      <div className="mnpage">
        <h1>{props.data.title}</h1>
        <p>${props.data.price}</p>
      </div>
    </div>
  );
};

export default Card;

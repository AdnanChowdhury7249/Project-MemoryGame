import React from "react";
import "../styles/Card.css";

const CardComponent = ({ name, image, onClick }) => {
  return (
    <div className="pokemonCard" onClick={onClick}>
      <img className="poke-img" src={image} alt={name} />

    </div>
  );
};

export default CardComponent;

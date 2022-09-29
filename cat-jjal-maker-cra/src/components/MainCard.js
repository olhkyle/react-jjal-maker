import React from "react";

const MainCard = ({img, onHeartClick, alreadyFavorite}) => {
    const heartIcon = alreadyFavorite ? '💖' : '🤍'
    return (
      <div class="main-card">
        <img
        src={img}
        alt="고양이"
        width="400"
      />
      <button onClick={onHeartClick}>{heartIcon}</button>
      </div>
    )
  }

  export default MainCard
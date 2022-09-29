import React from "react";


function CatItem (props){
  return (
  <li> 
    <img src={props.img} alt=""/>
  </li>
  )
}

function Favorites({fav}) {
    if (fav.length === 0){ // 처음에는 favorites 리스트가 빈배열이기 때문에 -> 이와같은 기능을 조건부렌더링이라고 한다.
      return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요</div>;
    }
    return(
      <ul className="favorites">
        {fav.map(cat => <CatItem img={cat} key={cat}/>)}
      </ul>
    )
  }


  export default Favorites
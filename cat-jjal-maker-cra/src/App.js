import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Title from './components/Title'
import MainCard from './components/MainCard'
import Favorites from './components/Favorites'

// util func

const jsonLocalStorage = {
  setItem: (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
  return JSON.parse(localStorage.getItem(key));
  },
};


const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};



const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";

  const [counter, setCounter] = useState(() => {
      return jsonLocalStorage.getItem('counter')
    }
  );
  const [mainCat, setMainCat] = useState(CAT1);
  const [fav, setFav] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || []
  })

  const isAlreadyFavorite= fav.includes(mainCat);
  
  // 앱 진입시 API 콜을 해서 API 데이터를 mainCat으로 갈아주는 것을 할 것이다.
  // setInitCat()을 바로 실행해버리면, API를 호출해서 계속 값을 받아오기 때문에, 무한 루프에서 도는 것처럼 작동한다. 이를 위해 useEffect를 활용하면, mount될 때에만 작동하게 할 수 있다.
  async function setInitCat(){
    const newCat = await fetchCat('First cat');
    setMainCat(newCat);
  }

  useEffect(() => {
    setInitCat();
  }, [])
  // 빈 배열을 넣음으로서, state나 props를 내려주거나 받는 것이 아니기 떄문에, 빈 배열을 넣어주면, app이 실행되어 첫렌더링 직후 mount될 때에만 작동할 것이다.

  // console.log('hello'); // 앱이 업데이트 또는 form 제출 때마다 ui가 그려질 때마다 계속 찍힐 것이다. 

  // 비동기로 API 호출 -> 즉, form 데이터가 전송되면, form과 관련된 함수를 실행한후 반환한 값인 updateMainCat을 실행한다.
  async function updateMainCat(value){
    const newCat = await fetchCat(value)
    setMainCat(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick (){
    const nextFav = [...fav, mainCat]
    setFav(nextFav);
    jsonLocalStorage.setItem("favorites", nextFav);
  }

  const counterTitle = counter === null ? '' :  `${counter} 번째`
  return (
  <div>
    <Title>{counterTitle} 고양이 가라사대</Title>
    <Form updateMainCat={updateMainCat}/>
    <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={isAlreadyFavorite}/>
    <Favorites fav={fav}/>
    </div>
 )
}

export default App
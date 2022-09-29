import React, { useState } from 'react';


const Form = ({updateMainCat}) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text); // true 또는 false를 반환 (한글이 있다면 true)
    const [value, setValue] = useState(''); // input에 들어가는 value는 일반적으로 문자열 
    const [error, setError] = useState('');
  
  
    function handleInputChange(event){
        const userValue = event.target.value
        setValue(userValue.toUpperCase()) // 대문자로만 입력하도록 만들기
        setError('');
        if(includesHangul(userValue)){
          setError('한글은 입력할 수 없습니다.')
        };
        
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        setError('');
        if(value === ""){
          setError('빈 채로 제출할 수 없습니다.')
          return; // value 빈값일 경우, updateMainCat()까지 실행하지 않도록, 함수를 종료시켜준다.
        }
        updateMainCat(value);
      }
    
      return (
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="name" placeholder="영어 대사를 입력해주세요" value={value} onChange={handleInputChange} /> 
          <button type="submit">생성</button>
          <p style={{color:'red' }}>{error}</p>
        </form>
      )
    }

export default Form;
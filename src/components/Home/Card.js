import React, {useState} from 'react';

function Card() {
  const [state, setState] = useState({
    price: 300,
    personLimit: 30,
    count: 1,
    tierOne: .95,
    tierTwo: .90,
    tierThree: .85,
  });

  const addCount = () => {
    setState({...state, count: state.count + 1})
  };

  const minusCount = () => {
    setState({...state, count: state.count - 1})
  };

  const displayDiscount = () => {
    const {price, personLimit, count, tierOne, tierTwo, tierThree} = state;
    const first = Math.round(personLimit * .33)
    const second = Math.round(personLimit * .66)
    if (count < first) {
      return (
        <div>
          <h1>Your Discount: {price * tierOne}</h1>
          <h1>You get: 5% off</h1>
          <h1>{first - count} until next discount</h1>
        </div>
      )
       
    } else if (count < second) {
      return (
        <div>
          <h1>Your Discount: {price * tierTwo}</h1>
          <h1>You get: 10% off</h1>
          <h1>{second - count} until next dicount</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Your Discount: {price * tierThree}</h1>
          <h1>You get: 15% off</h1>
          <h1>You are at the maximum dicount</h1>
        </div>
      )
    }
  }

  return (
    <div id='productBox'>
      <h1>Original Price: {state.price}</h1>
      {displayDiscount()}
      <h1>{state.count}/{state.personLimit}</h1>
      <button onClick={() => addCount()}>+</button>
      <button onClick={() => minusCount()}>-</button>
    </div>
  )
}

export default Card;
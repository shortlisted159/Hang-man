import { useEffect } from 'react';
import React from 'react'
import { checkWin } from '../notiHelper/notiHelper';

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable , playAgain}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;


  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ){
    finalMessage = 'WooHoo! Congratulations buddy, you win ✨🎉'
    playable = false
  } else if(checkWin(correctLetters, wrongLetters, selectedWord)=== 'lose'){
    finalMessage = 'Sorry Pal 😢, Better luck next time'
    finalMessageRevealWord = `The word was: ${selectedWord}`;
    playable = 'false'
  }

useEffect(() => setPlayable(playable))
  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {} }>
        <div className="popup">
            <h2>{finalMessage}</h2>
            <h3>{finalMessageRevealWord}</h3>
            <button onClick={playAgain}>Play Again</button>
        </div>
    </div>
  )
}

export default Popup
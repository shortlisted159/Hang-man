import React, {useState, useEffect} from 'react'
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import {showNotification as show} from './notiHelper/notiHelper'

import './App.css';

const words = ['flabbergasted', 'denial', 'stars', 'quixotic', 'equanimity',
 'forever', 'incredible', 'condescending', 'flower', 'tickle', 'smile',
'coder', 'books', 'clouds', 'cat', 'nightsky', 'technology', 
'wonderful', 'music', 'mountains', 'magic', 'trekking', 'business']
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleClick = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleClick);

    return () => window.removeEventListener('keydown', handleClick);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }


  return (
    <>
    <Header/>
    <div className="game-container">
      <Figure wrongLetters={wrongLetters}/>
      <WrongLetters wrongLetters={wrongLetters}/>
      <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
    </div>
    <Popup correctLetters={correctLetters} wrongLetters={wrongLetters}
    selectedWord={selectedWord} setPlayable={setPlayable} playAgain = {playAgain}/>
    <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;

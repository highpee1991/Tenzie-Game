import { useEffect, useState, useRef } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import Die, { generateDiceNum } from "./component/Die";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill,
} from "react-icons/bs";
import Confetti from "react-confetti";
import Timeleft from "./component/timer/Timeleft";
import Modal from "./component/modal/Modal";

function App() {
  const [dieList, setDieList] = useState(generateDiceNum());
  const [tenzies, setTenzies] = useState(false);
  const [rollsCount, setRollsCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(0);

  // timer ref
  const zeroNum = useRef(null);
  // timer func
  const clear = () => {
    window.clearInterval(zeroNum.current);
  };

  // timer stop count
  const stop = () => {
    clear();
  };

  // reset timer
  const resetTimer = () => {
    return setMin(1), setSec(0);
  };

  useEffect(() => {
    const isHeld = dieList.every((die) => die.isHeld);
    const firstNumber = dieList[0].value;
    const everyNum = dieList.every((die) => die.value === firstNumber);

    if (isHeld && everyNum) {
      setTenzies(true);
      stop();
    }
  }, [dieList]);

  useEffect(() => {
    if (sec < 2 && min === 0) {
      stop();
    }
  }, [sec, min]);

  const holdDice = (dieId) => {
    const isID = dieList.map((li) =>
      li.id === dieId ? { ...li, isHeld: !li.isHeld } : { ...li }
    );

    setDieList(isID);
  };

  const generateNewDie = () => {
    const randomNum = Math.ceil(Math.random() * 6);
    return { value: randomNum, isHeld: false, id: nanoid() };
  };

  const resetGame = () => {
    setTenzies(false);
    setDieList(generateDiceNum());
    setRollsCount(0);
    resetTimer();
  };

  const rollDice = () => {
    if (!tenzies) {
      const isHeld = dieList.map((li) =>
        li.isHeld ? { ...li } : generateNewDie()
      );
      setRollsCount((prev) => prev + 1);
      setDieList(isHeld);
    } else {
      resetGame();
    }
  };

  const isGameStarted = () => {
    setGameStarted((prev) => !prev);
  };

  const value = dieList.map((dieValue) => {
    const nums = (num) => {
      if (num === 1) {
        return <BsDice1Fill className="dice" />;
      } else if (num === 2) {
        return <BsDice2Fill className="dice" />;
      } else if (num === 3) {
        return <BsDice3Fill className="dice" />;
      } else if (num === 4) {
        return <BsDice4Fill className="dice" />;
      } else if (num === 5) {
        return <BsDice5Fill className="dice" />;
      } else {
        return <BsDice6Fill className="dice" />;
      }
    };

    return (
      <Die
        key={dieValue.id}
        value={nums(dieValue.value)}
        isHeld={dieValue.isHeld}
        holdDice={() => holdDice(dieValue.id)}
      />
    );
  });

  return gameStarted ? (
    <div className="App">
      {min === 0 && sec < 2 && (
        <div className="modal-wrapper">
          <Modal gameStart={resetGame} />
        </div>
      )}
      {tenzies && <Confetti />}
      <h3 className="timer">
        <Timeleft
          min={min}
          setMin={setMin}
          sec={sec}
          setSec={setSec}
          resetTimer={resetTimer}
          zeroNum={zeroNum}
          clear={clear}
          stop={stop}
        />
      </h3>
      <div className="tenzies-details">
        <h1 className="tenzies-header">Tenzies</h1>
        <p className="tenzies-about">
          Roll dice untill all dice are the same. Click each die to freeze it at
          it's current value btween rolls.
        </p>
        <h2 className="number-of-rolls">
          Number Of Rolls: <span className="nums">{rollsCount}</span>{" "}
        </h2>
      </div>
      <div className={min === 0 && sec < 11 ? "red-bg" : "tenzies-container"}>
        <div className="dice-list">{value}</div>
      </div>
      <button className="btn" onClick={rollDice}>
        {` ${!tenzies ? "Roll" : "New Game"} `}
      </button>
    </div>
  ) : (
    <div className="game-started">
      <button onClick={isGameStarted} className="get-started btn-start">
        Start Game
      </button>
    </div>
  );
}

export default App;

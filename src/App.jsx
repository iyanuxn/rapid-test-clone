import { useState } from "react";
import React from "react";
import "./App.css";
import scoreimg from "./assets/score.png";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [current, setcurrent] = useState("question questionClicked");
  const [score, setscore] = useState(0);

  const cardContents = [
    {
      cardHeader: "Question 1",
      cardBody: "I am a test question and I'm here as a placeholder",
      options: ["Option 1", "Option 2", "Option 3"],
    },
    {
      cardHeader: "Question 2",
      cardBody: "I am a test question and I'm here as a placeholder",
      options: ["Option 1", "Option 2", "Option 3"],
    },
    {
      cardHeader: "Question 3",
      cardBody: "I am a test question and I'm here as a placeholder",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ];

  const questions = [];
  const solution = [1, 1, 1];
  for (let i = 0; i < cardContents.length; i++) {
    questions.push(i + 1);
  }

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    // set the selected option to the answers array at the current question index
    let newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  return (
    <div>
      <div className="appHeader">
        <h1>Rapid Test</h1>
        <div className="submit-lg">
          <button
            className="submitButton"
            onClick={() => {
              //  check how many answers correspond to the solution
              let correctAnswers = 0;
              for (let i = 0; i < solution.length; i++) {
                if (answers[i] === solution[i]) {
                  correctAnswers++;
                }
              }
              setscore(correctAnswers);
              document.querySelector(".card").style.display = "none";
              document.querySelector(".questionNumber").style.display = "none";
              document.querySelector(".submit-lg").style.display = "none";
              document.querySelector(".modal").style.display = "flex";
              // hide the modal after 3 seconds
              // set answers to empty array
              setTimeout(() => {
                document.querySelector(".modal").style.display = "none";
                // set answers to empty array
                setAnswers([]);
                document.querySelector(".card").style.display = "block";
                document.querySelector(".questionNumber").style.display =
                  "grid";
                document.querySelector(".submit-lg").style.display = "flex";
              }, 3000);
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="appBody">
        <div className="modal">
          <img src={scoreimg} alt="" />
          <h2>
            You scored {score} out of {solution.length}
          </h2>
        </div>
        <div className="card">
          <div className="cardHeader">
            {cardContents[currentQuestion].cardHeader}
          </div>
          <div className="cardBody">
            {cardContents[currentQuestion].cardBody}
          </div>
          <div className="cardOptions">
            {cardContents[currentQuestion].options.map((option, index) => (
              /* Setting the selected option to the index of the option that is clicked. */
              <div
                onClick={() => handleOptionClick(index)}
                className={
                  index === selectedOption
                    ? "cardOption optionClicked"
                    : "cardOption"
                }
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="questionNumber">
        {questions.map((question, index) => (
          <div
            onClick={() => {
              setCurrentQuestion(index);
              setSelectedOption(answers[index]);
              setcurrent("question questionClicked");
            }}
            className={
              index === currentQuestion || answers[index] !== undefined
                ? "question questionClicked"
                : "question"
            }
          >
            {question}
          </div>
        ))}
      </div>
      <div className="appFooter">
        <button
          className="submitButton"
          onClick={() => {
            //  check how many answers correspond to the solution
            let correctAnswers = 0;
            for (let i = 0; i < solution.length; i++) {
              if (answers[i] === solution[i]) {
                correctAnswers++;
              }
            }
            setscore(correctAnswers);
            document.querySelector(".card").style.display = "none";
            document.querySelector(".questionNumber").style.display = "none";
            document.querySelector(".appFooter").style.display = "none";
            document.querySelector(".modal").style.display = "flex";
            // hide the modal after 3 seconds
            // set answers to empty array
            setTimeout(() => {
              document.querySelector(".modal").style.display = "none";
              // set answers to empty array
              setAnswers([]);
              document.querySelector(".card").style.display = "block";
              document.querySelector(".questionNumber").style.display = "grid";
              document.querySelector(".appFooter").style.display = "flex";
            }, 3000);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect (() => {
    const timer = setTimeout(() => {
      // Check greater than 1.  This is due to the fact that the timeRemaining does not get updated
      // until after the rendering.  Thus an "off by 1" issue
      if (timeRemaining > 1) {
        setTimeRemaining(timeRemaining - 1)
      } else {
        // The contestant did not answer in time.  Set up the time for the next question.
        onAnswered(false)
        setTimeRemaining(10)
      }
    }, 1000)
    return () => (clearTimeout(timer))
    
  }, [timeRemaining])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

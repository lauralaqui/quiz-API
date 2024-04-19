import React from 'react';

export default function Quiz(props) {
    const { id, question, shuffledAnswers, correctAnswer, selectedAnswer } = props.question;

    return (
        <div role="group" aria-labelledby={`question-${id}`} className="quiz-question">
            <h2 id={`question-${id}`} className="question">{question}</h2>
            <div className='answers-container'>
                {shuffledAnswers.map((answerText, index) => {
                    let buttonClass = "";
                    const correctAnswerId = shuffledAnswers.findIndex(answer => answer === correctAnswer);
                    const isCorrectAnswer = index === correctAnswerId;
                    const isIncorrectAnswer = index !== correctAnswerId && selectedAnswer === index;
                    const isSelectedAnswer = index === selectedAnswer;

                    switch (true) {
                        case (props.showAnswer && isCorrectAnswer):
                            buttonClass = "disabled correct";
                            break;
                        case (props.showAnswer && isIncorrectAnswer):
                            buttonClass = "disabled incorrect";
                            break;
                        case props.showAnswer:
                            buttonClass = "disabled";
                            break;
                        case (!props.showAnswer && isSelectedAnswer):
                            buttonClass = "active";
                            break;
                        default:
                            buttonClass = "";
                            break;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => props.markAnswer(index, id)}
                            className={buttonClass}
                            aria-label={`${answerText} (${isCorrectAnswer ? 'Correct' : 'Incorrect'})`}
                            tabIndex={!props.showAnswer ? '0' : '-1'}
                        >
                            {answerText}
                        </button>
                    )
                })}
            </div>
            <hr />
        </div>
    );
}
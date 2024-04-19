import React, { useState, useEffect } from 'react';
import Blobbackground from './components/Blobbackground';
import Start from './components/Start';
import Quiz from './components/Quiz';
import { nanoid } from 'nanoid';
import he from 'he';

export default function App() {
    const [start, setStart] = useState(false);
    const [dataloaded, setDataloaded] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctQuestions, setCorrectQuestions] = useState(0);

    function startGame() {
        setStart(true);
    }

    function getTriviaData() {
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results.map(question => {
                    const shuffledAnswers = question.incorrect_answers.map(answer => he.decode(answer));
                    const correctAnswer = he.decode(question.correct_answer);
                    const randomIndex = Math.floor(Math.random() * (shuffledAnswers.length + 1));
                    shuffledAnswers.splice(randomIndex, 0, correctAnswer);

                    return {
                        id: nanoid(),
                        question: he.decode(question.question),
                        shuffledAnswers: shuffledAnswers,
                        correctAnswer: correctAnswer,
                        selectedAnswer: -1
                    };
                }));
                setDataloaded(true);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }

    useEffect(() => {
        getTriviaData();
    }, []);

    function markAnswer(selectedAnswer, questionId) {
        setQuestions(prevQuestions => questions.map(question => {
            return question.id === questionId ? { ...question, selectedAnswer: selectedAnswer } : question;
        }));
    }

    function checkAnswers() {
        let correctCount = 0;
        for (let question of questions) {
            const correctAnswerIndex = question.shuffledAnswers.findIndex(answer => answer === question.correctAnswer);

            if (question.selectedAnswer === correctAnswerIndex) {
                correctCount++;
            }
        }
        setCorrectQuestions(correctCount);
        setTotalQuestions(questions.length);
        setShowAnswers(true);
    }

    function reset() {
        setQuestions([]);
        setShowAnswers(false);
        setCorrectQuestions(0);
        setDataloaded(false);
        getTriviaData();
    }

    const questionElements = questions.map(question => (
        <Quiz
            question={question}
            key={question.id}
            markAnswer={markAnswer}
            showAnswer={showAnswers}
        />
    ));

    return (
        start ? (
           <main>
           <Blobbackground />
           {questionElements}
           {showAnswers ? 
                <div className='score'>
                       <h3>You scored {correctQuestions}/{totalQuestions} correct answers</h3>
                       <button className='gameButton' 
                       onClick={reset}
                       aria-label='check answers'>
                            Play again
                        </button>
                </div>
             : 
              dataloaded && <button className='gameButton' onClick={checkAnswers}>Check answers</button>           }
           </main>
        ): <Start startGame= {startGame}/>
    )//return
}

import React from "react";
import { quizData } from "./quizdata";

class HistoryQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    user_answers: [],
    correct_answers: []
  };

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  handleResetClick = () => {
    window.location.reload();
  };
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  answerHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    } else {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      });
    }
    this.state.user_answers.push(this.state.myAnswer);
    this.state.correct_answers.push(this.state.answer);
  };

  rightAnswer = (user_answer, answer) => {
    return (
      <p>
        Du svarede {user_answer}, det rigtige svar var: <br />
        {answer}
      </p>
    );
  };

  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h2>De rigtige svar på spørgsmålene er:</h2>
          <h3>
            <ul>
              {this.state.user_answers.map((item, index) => (
                <li className="done" key={index}>
                  {this.rightAnswer(item, this.state.correct_answers[index])}
                </li>
              ))}
            </ul>
          </h3>
          <button className="refresh" onClick={this.handleResetClick}>
            Tag Quiz igen
          </button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>{this.state.questions} </h1>
          {options.map(option => (
            <p
              key={option.id}
              className={`options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <button
              className="button"
              disabled={this.state.disabled}
              onClick={this.answerHandler}
            >
              Næste
            </button>
          )}
          {currentQuestion === quizData.length - 1 && (
            <button className="ui inverted button" onClick={this.answerHandler}>
              Færdig
            </button>
          )}
        </div>
      );
    }
  }
}

export default HistoryQuiz;

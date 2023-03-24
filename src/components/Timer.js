import React, { Component } from "react";
import "./Timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.time,
      isRunning: props.autostart || false,
      progress: 100,
    };
  }

  componentDidMount() {
    if (this.state.isRunning) {
      this.start();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    const { time, step } = this.props;
    const { isRunning } = this.state;

    if (isRunning && time > 0) {
      const remainingTime = Math.max(this.state.time - step, 0);
      const progress = (remainingTime / this.props.time) * 100;
      this.setState({
        time: remainingTime,
        progress: progress,
      });

      if (this.props.onTick) {
        this.props.onTick(remainingTime);
      }
    } else {
      this.stop();
    }
  }

  start() {
    this.setState({
      isRunning: true,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, this.props.step);
  }

  stop() {
    clearInterval(this.timer);
    this.setState({
      isRunning: false,
    });
  }

  reset() {
    this.setState({
      time: this.props.time,
      progress: 100,
    });
  }

  render() {
    const { time, progress } = this.state;

    return (
      <div className="timer-wrapper">
        <div className="timer-bar" style={{ width: `${progress}%` }}></div>
        <div className="timer-label">{time}</div>
        <div className="timer-controls">
          <button onClick={() => this.start()}>Start</button>
          <button onClick={() => this.stop()}>Stop</button>
          <button onClick={() => this.reset()}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Timer;

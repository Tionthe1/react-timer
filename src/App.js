import React, { Component } from "react";
import Timer from "./components/Timer";

class App extends Component {
  render() {
    return (
      <div>
        <Timer
          time={60000}
          autostart={true}
          onTick={(time) => console.log("Time left: " + time)}
          step={1000}
        />
        <Timer
          time={60000}
          autostart={true}
          onTick={(time) => console.log("Time left: " + time)}
          step={2000}
        />
      </div>
    );
  }
}

export default App;

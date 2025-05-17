// CloudMiningAnimation.js
import React, { Component } from 'react';
import './CloudMiningAnimation.css';

class CloudMiningAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashRate: 0,
      logs: [],
      dots: '',
      onlineUsers: 720,
    };
  }

  componentDidMount() {
    this.simulateHashRate();
    this.simulateConsoleLogs();
    this.simulateDots();
    this.simulateOnlineUsers();
  }

  componentWillUnmount() {
    clearInterval(this.hashInterval);
    clearInterval(this.logInterval);
    clearInterval(this.dotInterval);
    clearInterval(this.usersInterval);
  }

  simulateHashRate = () => {
    this.hashInterval = setInterval(() => {
      const newRate = (Math.random() * 1000 + 1000).toFixed(2); // e.g. 1000.00 - 2000.00 H/s
      this.setState({ hashRate: newRate });
    }, 2000);
  };

  simulateConsoleLogs = () => {
    const logMessages = [
      'Mining block...',
      'Block found! Reward received.',
      'Submitting results to pool...',
      'Optimizing mining algorithm...',
      'Validating shares...',
      'Hash accepted by pool!',
      'Calculating difficulty adjustment...',
    ];
    this.logInterval = setInterval(() => {
      const log = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date().toLocaleTimeString();
      this.setState((prevState) => ({
        logs: [`[${timestamp}] ${log}`, ...prevState.logs.slice(0, 4)],
      }));
    }, 1500);
  };

  simulateDots = () => {
    const dotPhases = ['⠁', '⠂', '⠄', '⠂'];
    let i = 0;
    this.dotInterval = setInterval(() => {
      this.setState({ dots: dotPhases[i] });
      i = (i + 1) % dotPhases.length;
    }, 400);
  };

  simulateOnlineUsers = () => {
    this.usersInterval = setInterval(() => {
      this.setState((prevState) => {
        let variation = Math.floor(Math.random() * 6 - 2); // -2 to +3
        let newCount = Math.max(700, prevState.onlineUsers + variation);
        return { onlineUsers: newCount };
      });
    }, 3000);
  };

  render() {
    const { hashRate, logs, dots, onlineUsers } = this.state;

    return (
      <div className="mining-animation-container">
        <h2 className="title">⛏ Cloud Mining in Action</h2>

        <div className="online-users-count">
          🟢 {onlineUsers} Users Currently Mining
        </div>

        <div className="console">
          <div className="dots">{dots} Mining in progress...</div>
          <div className="logs">
            {logs.map((log, index) => (
              <div key={index} className="log-line">{log}</div>
            ))}
          </div>
        </div>

        <div className="meters-section">
          <div className="hash-meter">
            <label>Hash Rate:</label>
            <div className="meter-bar">
              <div
                className="meter-fill"
                style={{ width: `${Math.min(hashRate / 20, 100)}%` }}
              ></div>
            </div>
            <span className="hash-rate-display">{hashRate} H/s</span>
          </div>

          <div className="fake-speed-meters">
            <div className="speed-meter">
              <label>GPU-01:</label>
              <div className="gauge-bar" style={{ width: '72%' }}></div>
            </div>
            <div className="speed-meter">
              <label>GPU-02:</label>
              <div className="gauge-bar" style={{ width: '85%' }}></div>
            </div>
            <div className="speed-meter">
              <label>GPU-03:</label>
              <div className="gauge-bar" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CloudMiningAnimation;

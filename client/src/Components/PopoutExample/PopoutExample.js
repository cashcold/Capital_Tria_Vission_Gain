import React, { Component } from 'react';
import './PopoutExample.css'; // Import your CSS

class PopoutExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopout: false,
    };
  }

  componentDidMount() {
    // Show popout on mount
    this.setState({ showPopout: true });
  }

  closePopout = () => {
    this.setState({ showPopout: false });
  };

  render() {
    return (
      <div className="page-container">
        {this.state.showPopout && (
          <div className="overlay">
            <div className="popout">
              <img
                src='https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FMANY%20MORE.jpg?alt=media&token=5975b784-7100-4d95-b0fe-ee411c485707'
                alt="Popout"
                className="popout-image"
              />
              {/* <h2>Hello there! 👋</h2>
              <p>This is a popout message with an image.</p> */}
              <button onClick={this.closePopout} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PopoutExample;

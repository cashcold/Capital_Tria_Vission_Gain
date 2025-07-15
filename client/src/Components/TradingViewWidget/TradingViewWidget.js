import React, { Component } from 'react';

class TradingViewWidget extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "300", // fixed to a proper pixel value
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "dark",
      locale: "en"
    });

    document.getElementById('tradingview-widget-container').appendChild(script);
  }

  render() {
    return (
      <div className="tradingview-widget-container" id="tradingview-widget-container">
        <div className="tradingview-widget-container__widget" />
        <div className="tradingview-widget-copyright">
          <a href="https://capgainco.com" rel="noopener noreferrer" target="_blank">
            <span className="blue-text">Track all markets on Capgainco</span>
          </a>
        </div>
      </div>
    );
  }
}

export default TradingViewWidget;

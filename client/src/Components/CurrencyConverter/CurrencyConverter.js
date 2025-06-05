import React, { Component } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

class CurrencyConverter extends Component {
  state = {
    rates: {},
    loading: true,
    error: null,
    darkMode: true,
    showAll: false,
  };

  currencies = [
    { code: 'USD', label: '🇺🇸 USD' },
    { code: 'EUR', label: '🇪🇺 EUR' },
    { code: 'GBP', label: '🇬🇧 GBP' },
    { code: 'XOF', label: '🇸🇳 XOF (CFA)' },
  ];

  componentDidMount() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.setState({ darkMode: false });
    }

    this.fetchRates();
    this.interval = setInterval(this.fetchRates, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchRates = () => {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(response => {
        const data = response.data.rates;
        const usdToGHS = data['GHS'];

        if (!usdToGHS) throw new Error("GHS rate not available");

        const calculatedRates = {};
        this.currencies.forEach(({ code }) => {
          const usdToCurrency = data[code];
          if (usdToCurrency) {
            calculatedRates[code] = usdToGHS / usdToCurrency;
          }
        });

        // Store all rates for "view all"
        this.setState({ 
          rates: calculatedRates, 
          allRates: data, 
          loading: false, 
          error: null 
        });
      })
      .catch(() => {
        this.setState({ error: 'Error loading currency data.', loading: false });
      });
  };

  toggleTheme = () => {
    this.setState(prev => {
      const newMode = !prev.darkMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return { darkMode: newMode };
    });
  };

  handleShowAll = () => {
    this.setState({ showAll: true });
  };

  handleCloseAll = () => {
    this.setState({ showAll: false });
  };

  render() {
    const { rates, loading, error, darkMode, showAll, allRates } = this.state;
    const themeClass = darkMode ? 'dark-mode' : 'light-mode';

    return (
      <div className={`currency-container ${themeClass}`}>
        <button className="theme-toggle-btn" onClick={this.toggleTheme}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <h2 className="currency-title">💱 Live Exchange Rates to GHS</h2>
        {loading && <p className="currency-loading">Loading exchange rates...</p>}
        {error && <p className="currency-error">{error}</p>}
        {!loading && !error && (
          <>
            <ul className="currency-list">
              {this.currencies.map(({ code, label }) => (
                <li key={code} className="currency-item">
                  <strong>{label}</strong> = {rates[code]?.toFixed(2)} GHS
                </li>
              ))}
            </ul>
            <button className="view-all-btn" onClick={this.handleShowAll}>
              View All Currencies
            </button>
            {showAll && allRates && (
              <div className="all-currencies-popup">
                <div className="all-currencies-content">
                  <h3>All Currencies to GHS</h3>
                  <ul className="all-currencies-list">
                    {Object.entries(allRates).map(([code, rate]) => (
                      <li key={code}>
                        <strong>{code}</strong> = {(allRates['GHS'] / rate).toFixed(2)} GHS
                      </li>
                    ))}
                  </ul>
                  <button className="close-btn" onClick={this.handleCloseAll}>Close</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default CurrencyConverter;
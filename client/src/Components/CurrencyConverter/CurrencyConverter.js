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
  { code: 'GHS', label: '🇬🇭 GHS' },
  { code: 'CAD', label: '🇨🇦 CAD' },
  { code: 'JPY', label: '🇯🇵 JPY' },
  { code: 'AUD', label: '🇦🇺 AUD' },
  { code: 'CNY', label: '🇨🇳 CNY' },
  { code: 'INR', label: '🇮🇳 INR' },
  { code: 'ZAR', label: '🇿🇦 ZAR' },
  { code: 'NGN', label: '🇳🇬 NGN' },
  { code: 'BRL', label: '🇧🇷 BRL' },
  { code: 'CHF', label: '🇨🇭 CHF' },
  { code: 'SEK', label: '🇸🇪 SEK' },
  { code: 'SGD', label: '🇸🇬 SGD' },
  { code: 'RUB', label: '🇷🇺 RUB' },
  { code: 'NZD', label: '🇳🇿 NZD' },
  { code: 'MXN', label: '🇲🇽 MXN' },
  { code: 'SAR', label: '🇸🇦 SAR' },
  { code: 'AED', label: '🇦🇪 AED' },
  { code: 'EGP', label: '🇪🇬 EGP' },
  { code: 'TRY', label: '🇹🇷 TRY' },
  { code: 'PLN', label: '🇵🇱 PLN' },
  { code: 'DKK', label: '🇩🇰 DKK' },
  { code: 'NOK', label: '🇳🇴 NOK' },
  { code: 'CZK', label: '🇨🇿 CZK' },
  { code: 'HUF', label: '🇭🇺 HUF' },
  { code: 'ILS', label: '🇮🇱 ILS' },
  { code: 'KRW', label: '🇰🇷 KRW' },
  { code: 'THB', label: '🇹🇭 THB' },
  { code: 'MYR', label: '🇲🇾 MYR' },
  { code: 'IDR', label: '🇮🇩 IDR' },
  { code: 'PHP', label: '🇵🇭 PHP' },
  { code: 'PKR', label: '🇵🇰 PKR' },
  { code: 'KES', label: '🇰🇪 KES' },
  { code: 'GMD', label: '🇬🇲 GMD' },
  { code: 'MAD', label: '🇲🇦 MAD' },
  { code: 'TND', label: '🇹🇳 TND' },
  { code: 'UAH', label: '🇺🇦 UAH' },
  { code: 'QAR', label: '🇶🇦 QAR' },
  { code: 'BHD', label: '🇧🇭 BHD' },
  { code: 'OMR', label: '🇴🇲 OMR' },
  { code: 'KWD', label: '🇰🇼 KWD' },
  { code: 'JOD', label: '🇯🇴 JOD' },
  { code: 'LBP', label: '🇱🇧 LBP' },
  { code: 'SDG', label: '🇸🇩 SDG' },
  { code: 'TZS', label: '🇹🇿 TZS' },
  { code: 'UGX', label: '🇺🇬 UGX' },
  { code: 'MWK', label: '🇲🇼 MWK' },
  { code: 'MUR', label: '🇲🇺 MUR' },
  { code: 'XAF', label: '🇨🇲 XAF' },
  { code: 'XCD', label: '🇦🇬 XCD' },
  { code: 'XPF', label: '🇵🇫 XPF' },
  { code: 'AFN', label: '🇦🇫 AFN' },
  { code: 'ALL', label: '🇦🇱 ALL' },
  { code: 'AMD', label: '🇦🇲 AMD' },
  { code: 'ANG', label: '🇳🇱 ANG' },
  { code: 'AOA', label: '🇦🇴 AOA' },
  { code: 'ARS', label: '🇦🇷 ARS' },
  { code: 'AWG', label: '🇦🇼 AWG' },
  { code: 'AZN', label: '🇦🇿 AZN' },
  { code: 'BAM', label: '🇧🇦 BAM' },
  { code: 'BBD', label: '🇧🇧 BBD' },
  { code: 'BDT', label: '🇧🇩 BDT' },
  { code: 'BGN', label: '🇧🇬 BGN' },
  { code: 'BIF', label: '🇧🇮 BIF' },
  { code: 'BMD', label: '🇧🇲 BMD' },
  { code: 'BND', label: '🇧🇳 BND' },
  { code: 'BOB', label: '🇧🇴 BOB' },
  { code: 'BSD', label: '🇧🇸 BSD' },
  { code: 'BTN', label: '🇧🇹 BTN' },
  { code: 'BWP', label: '🇧🇼 BWP' },
  { code: 'BYN', label: '🇧🇾 BYN' },
  { code: 'BZD', label: '🇧🇿 BZD' },
  { code: 'CDF', label: '🇨🇩 CDF' },
  { code: 'CLP', label: '🇨🇱 CLP' },
  { code: 'COP', label: '🇨🇴 COP' },
  { code: 'CRC', label: '🇨🇷 CRC' },
  { code: 'CUC', label: '🇨🇺 CUC' },
  { code: 'CUP', label: '🇨🇺 CUP' },
  { code: 'CVE', label: '🇨🇻 CVE' },
  { code: 'DJF', label: '🇩🇯 DJF' },
  { code: 'DOP', label: '🇩🇴 DOP' },
  { code: 'DZD', label: '🇩🇿 DZD' },
  { code: 'ERN', label: '🇪🇷 ERN' },
  { code: 'ETB', label: '🇪🇹 ETB' },
  { code: 'FJD', label: '🇫🇯 FJD' },
  { code: 'FKP', label: '🇫🇰 FKP' },
  { code: 'GEL', label: '🇬🇪 GEL' },
  { code: 'GGP', label: '🇬🇬 GGP' },
  { code: 'GIP', label: '🇬🇮 GIP' },
  { code: 'GNF', label: '🇬🇳 GNF' },
  { code: 'GTQ', label: '🇬🇹 GTQ' },
  { code: 'GYD', label: '🇬🇾 GYD' },
  { code: 'HKD', label: '🇭🇰 HKD' },
  { code: 'HNL', label: '🇭🇳 HNL' },
  { code: 'HRK', label: '🇭🇷 HRK' },
  { code: 'HTG', label: '🇭🇹 HTG' },
  { code: 'IMP', label: '🇮🇲 IMP' },
  { code: 'IQD', label: '🇮🇶 IQD' },
  { code: 'IRR', label: '🇮🇷 IRR' },
  { code: 'ISK', label: '🇮🇸 ISK' },
  { code: 'JEP', label: '🇯🇪 JEP' },
  { code: 'JMD', label: '🇯🇲 JMD' },
  { code: 'KGS', label: '🇰🇬 KGS' },
  { code: 'KHR', label: '🇰🇭 KHR' },
  { code: 'KMF', label: '🇰🇲 KMF' },
  { code: 'KPW', label: '🇰🇵 KPW' },
  { code: 'KYD', label: '🇰🇾 KYD' },
  { code: 'KZT', label: '🇰🇿 KZT' },
  { code: 'LAK', label: '🇱🇦 LAK' },
  { code: 'LKR', label: '🇱🇰 LKR' },
  { code: 'LRD', label: '🇱🇷 LRD' },
  { code: 'LSL', label: '🇱🇸 LSL' },
  { code: 'LTL', label: '🇱🇹 LTL' },
  { code: 'LVL', label: '🇱🇻 LVL' },
  { code: 'LYD', label: '🇱🇾 LYD' },
  { code: 'MDL', label: '🇲🇩 MDL' },
  { code: 'MGA', label: '🇲🇬 MGA' },
  { code: 'MKD', label: '🇲🇰 MKD' },
  { code: 'MMK', label: '🇲🇲 MMK' },
  { code: 'MNT', label: '🇲🇳 MNT' },
  { code: 'MOP', label: '🇲🇴 MOP' },
  { code: 'MRU', label: '🇲🇷 MRU' },
  { code: 'MVR', label: '🇲🇻 MVR' },
  { code: 'MZN', label: '🇲🇿 MZN' },
  { code: 'NAD', label: '🇳🇦 NAD' },
  { code: 'NIO', label: '🇳🇮 NIO' },
  { code: 'NPR', label: '🇳🇵 NPR' },
  { code: 'PEN', label: '🇵🇪 PEN' },
  { code: 'PGK', label: '🇵🇬 PGK' },
  { code: 'PYG', label: '🇵🇾 PYG' },
  { code: 'RON', label: '🇷🇴 RON' },
  { code: 'RSD', label: '🇷🇸 RSD' },
  { code: 'RWF', label: '🇷🇼 RWF' },
  { code: 'SBD', label: '🇸🇧 SBD' },
  { code: 'SCR', label: '🇸🇨 SCR' },
  { code: 'SHP', label: '🇸🇭 SHP' },
  { code: 'SLL', label: '🇸🇱 SLL' },
  { code: 'SOS', label: '🇸🇴 SOS' },
  { code: 'SRD', label: '🇸🇷 SRD' },
  { code: 'STD', label: '🇸🇹 STD' },
  { code: 'SYP', label: '🇸🇾 SYP' },
  { code: 'SZL', label: '🇸🇿 SZL' },
  { code: 'TJS', label: '🇹🇯 TJS' },
  { code: 'TMT', label: '🇹🇲 TMT' },
  { code: 'TOP', label: '🇹🇴 TOP' },
  { code: 'TTD', label: '🇹🇹 TTD' },
  { code: 'TWD', label: '🇹🇼 TWD' },
  { code: 'UYU', label: '🇺🇾 UYU' },
  { code: 'UZS', label: '🇺🇿 UZS' },
  { code: 'VEF', label: '🇻🇪 VEF' },
  { code: 'VND', label: '🇻🇳 VND' },
  { code: 'VUV', label: '🇻🇺 VUV' },
  { code: 'WST', label: '🇼🇸 WST' },
  { code: 'YER', label: '🇾🇪 YER' },
  { code: 'ZMW', label: '🇿🇲 ZMW' },
  { code: 'ZWL', label: '🇿🇼 ZWL' }
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
              {this.currencies.slice(0, 5).map(({ code, label }) => (
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
                    {Object.entries(allRates).map(([code, rate]) => {
                      const currencyObj = this.currencies.find(c => c.code === code);
                      const flag = currencyObj ? currencyObj.label.split(' ')[0] : '';
                      return (
                        <li key={code}>
                          <strong>{flag} {code}</strong> = {(allRates['GHS'] / rate).toFixed(2)} GHS
                        </li>
                      );
                    })}
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
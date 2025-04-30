import React, { Component } from 'react';
import axios from 'axios';
import './ExchangeMarquee.css';

class ExchangeMarquee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      rates: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const url = `https://open.er-api.com/v6/latest/USD`;

    axios.get(url)
      .then((res) => {
        if (res.data && res.data.result === 'success') {
          this.setState({ rates: res.data.rates, loading: false });
        } else {
          this.setState({ error: 'Invalid response from API.', loading: false });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Could not load rates.', loading: false });
        console.error(err);
      });
  }

  getFlagEmoji = (countryCode) => {
    // Ensure the country code is valid and two letters
    if (!countryCode || countryCode.length !== 2) return '🏳'; // Default to a white flag if invalid
    return countryCode
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
  };

  render() {
    const { rates, loading, error } = this.state;
  
    const currencyToCountry = {
      AED: 'AE', AFN: 'AF', ALL: 'AL', AMD: 'AM', ANG: 'NL', AOA: 'AO', ARS: 'AR',
      AUD: 'AU', AWG: 'AW', AZN: 'AZ', BAM: 'BA', BBD: 'BB', BDT: 'BD', BGN: 'BG',
      BHD: 'BH', BIF: 'BI', BMD: 'BM', BND: 'BN', BOB: 'BO', BRL: 'BR', BSD: 'BS',
      BTN: 'BT', BWP: 'BW', BYN: 'BY', BZD: 'BZ', CAD: 'CA', CDF: 'CD', CHF: 'CH',
      CLP: 'CL', CNY: 'CN', COP: 'CO', CRC: 'CR', CUP: 'CU', CVE: 'CV', CZK: 'CZ',
      DJF: 'DJ', DKK: 'DK', DOP: 'DO', DZD: 'DZ', EGP: 'EG', ERN: 'ER', ETB: 'ET',
      EUR: 'EU', FJD: 'FJ', FKP: 'FK', FOK: 'FO', GBP: 'GB', GEL: 'GE', GGP: 'GG',
      GHS: 'GH', GIP: 'GI', GMD: 'GM', GNF: 'GN', GTQ: 'GT', GYD: 'GY', HKD: 'HK',
      HNL: 'HN', HRK: 'HR', HTG: 'HT', HUF: 'HU', IDR: 'ID', ILS: 'IL', IMP: 'IM',
      INR: 'IN', IQD: 'IQ', IRR: 'IR', ISK: 'IS', JEP: 'JE', JMD: 'JM', JOD: 'JO',
      JPY: 'JP', KES: 'KE', KGS: 'KG', KHR: 'KH', KID: 'KI', KMF: 'KM', KRW: 'KR',
      KWD: 'KW', KYD: 'KY', KZT: 'KZ', LAK: 'LA', LBP: 'LB', LKR: 'LK', LRD: 'LR',
      LSL: 'LS', LYD: 'LY', MAD: 'MA', MDL: 'MD', MGA: 'MG', MKD: 'MK', MMK: 'MM',
      MNT: 'MN', MOP: 'MO', MRU: 'MR', MUR: 'MU', MVR: 'MV', MWK: 'MW', MXN: 'MX',
      MYR: 'MY', MZN: 'MZ', NAD: 'NA', NGN: 'NG', NIO: 'NI', NOK: 'NO', NPR: 'NP',
      NZD: 'NZ', OMR: 'OM', PAB: 'PA', PEN: 'PE', PGK: 'PG', PHP: 'PH', PKR: 'PK',
      PLN: 'PL', PYG: 'PY', QAR: 'QA', RON: 'RO', RSD: 'RS', RUB: 'RU', RWF: 'RW',
      SAR: 'SA', SBD: 'SB', SCR: 'SC', SDG: 'SD', SEK: 'SE', SGD: 'SG', SHP: 'SH',
      SLE: 'SL', SLL: 'SL', SOS: 'SO', SRD: 'SR', SSP: 'SS', STN: 'ST', SYP: 'SY',
      SZL: 'SZ', THB: 'TH', TJS: 'TJ', TMT: 'TM', TND: 'TN', TOP: 'TO', TRY: 'TR',
    };
  
    if (loading) {
      return <div className="loading">Loading exchange rates...</div>;
    }
  
    if (error) {
      return <div className="error">{error}</div>;
    }
  
    const rateText = Object.entries(rates)
      .map(([currency, rate]) => {
        const countryCode = currencyToCountry[currency] || currency.slice(0, 2);
        const flag = this.getFlagEmoji(countryCode);
        console.log(`Currency: ${currency}, Country Code: ${countryCode}, Flag: ${flag}`);
        return `${flag} 1 USD = ${rate.toFixed(2)} ${currency}`;
      })
      .join('  |  ');
  
    return (
      <div className="exchange-marquee-container">
        <p
          className="marquee"
          onMouseOver={(e) => (e.target.style.animationPlayState = 'paused')}
          onMouseOut={(e) => (e.target.style.animationPlayState = 'running')}
        >
          {rateText}
        </p>
      </div>
    );
  }
}

export default ExchangeMarquee;

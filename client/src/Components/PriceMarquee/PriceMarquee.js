import React, { Component } from 'react';
import axios from 'axios';
import './PriceMarquee.css';

class PriceMarquee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: 'Loading prices...',
    };
  }

  componentDidMount() {
    const metalsKey = 'ZRFQLW7IUNS6FRXNGRYU245XNGRYU';

    // Metals.Dev API request
    axios
      .get('https://api.metals.dev/v1/latest', {
        params: {
          api_key: metalsKey,
          currency: 'USD',
          unit: 'toz',
        },
      })
      .then((response) => {
        console.log('Metals API Response:', response.data);

        // Extract metals data
        const metals = response.data.metals;
        const currencies = response.data.currencies;

        // Format metals data
        const metalPrices = [
          `Gold: $${metals.gold.toFixed(2)}/oz`,
          `Silver: $${metals.silver.toFixed(2)}/oz`,
          `Platinum: $${metals.platinum.toFixed(2)}/oz`,
          `Palladium: $${metals.palladium.toFixed(2)}/oz`,
          `Copper: $${metals.copper.toFixed(2)}/lb`,
          `Aluminum: $${metals.aluminum.toFixed(2)}/lb`,
          `Lead: $${metals.lead.toFixed(2)}/lb`,
          `Nickel: $${metals.nickel.toFixed(2)}/lb`,
          `Zinc: $${metals.zinc.toFixed(2)}/lb`,
        ];

        // Format currencies data
        const currencyRates = Object.entries(currencies).map(
          ([currency, rate]) => `USD/${currency}: ${rate.toFixed(4)}`
        );

        // Combine metals and currencies into a single string
        const prices = [...metalPrices, ...currencyRates];

        // Update state with the formatted prices
        this.setState({ prices: prices.join(' | ') });
      })
      .catch((error) => {
        console.error('Error fetching metals data:', error);
        this.setState({ prices: 'Error loading data.' });
      });
  }

  render() {
    return (
      <marquee behavior="scroll" direction="left" className="price-marquee">
        {this.state.prices}
      </marquee>
    );
  }
}

export default PriceMarquee;
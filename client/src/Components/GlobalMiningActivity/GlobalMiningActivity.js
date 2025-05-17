// GlobalMiningActivity.jsx
import React, { Component } from 'react';
import './GlobalMiningActivity.css';

class GlobalMiningActivity extends Component {
  constructor(props) {
    super(props);
    this.activities = [
  "💠 User in 🇳🇬 Nigeria just mined 0.00045 BTC",
  "⚡ New user from 🇩🇪 Germany started Plan III",
  "🔄 110TH/s added from 🇨🇦 Canada",
  "💠 User in 🇧🇷 Brazil mined 0.00032 BTC",
  "⚡ User in 🇮🇳 India upgraded to Plan IV",
  "🔄 65TH/s added from 🇯🇵 Japan",
  "💠 User in 🇿🇦 South Africa mined 0.00051 BTC",
  "⚡ New user from 🇬🇧 UK started Plan I",
  "🔄 504MH/s added from 🇺🇸 USA",
  "💠 User in 🇦🇷 Argentina just mined 0.00028 BTC",
  "⚡ New user from 🇦🇺 Australia started Plan II",
  "🔄 45TH/s added from 🇮🇹 Italy",
  "💠 User in 🇰🇪 Kenya mined 0.00034 BTC",
  "⚡ User in 🇫🇷 France upgraded to Plan III",
  "🔄 720MH/s added from 🇨🇳 China",
  "💠 User in 🇬🇭 Ghana just mined 0.00044 BTC",
  "⚡ New user from 🇷🇺 Russia started Plan IV",
  "🔄 85TH/s added from 🇦🇪 UAE",
  "💠 User in 🇪🇬 Egypt mined 0.00029 BTC",
  "⚡ User in 🇲🇽 Mexico upgraded to Plan II",
  "🔄 100TH/s added from 🇳🇱 Netherlands",
  "💠 User in 🇰🇷 South Korea mined 0.00037 BTC",
  "⚡ New user from 🇸🇪 Sweden started Plan I",
  "🔄 50TH/s added from 🇪🇸 Spain",
  "💠 User in 🇵🇱 Poland mined 0.00031 BTC",
  "⚡ User in 🇹🇷 Turkey upgraded to Plan III",
  "🔄 90TH/s added from 🇧🇪 Belgium",
  "💠 User in 🇮🇩 Indonesia mined 0.00040 BTC",
  "⚡ New user from 🇨🇭 Switzerland started Plan II",
  "🔄 130TH/s added from 🇸🇬 Singapore",
  "💠 User in 🇵🇭 Philippines mined 0.00033 BTC",
  "⚡ User in 🇨🇿 Czech Republic upgraded to Plan IV",
  "🔄 75TH/s added from 🇭🇺 Hungary",
  "💠 User in 🇹🇭 Thailand mined 0.00041 BTC",
  "⚡ New user from 🇮🇱 Israel started Plan I",
  "🔄 68TH/s added from 🇨🇴 Colombia",
  "💠 User in 🇦🇹 Austria mined 0.00030 BTC",
  "⚡ User in 🇩🇰 Denmark upgraded to Plan III",
  "🔄 55TH/s added from 🇳🇴 Norway",
  "💠 User in 🇫🇮 Finland mined 0.00039 BTC",
  "⚡ New user from 🇮🇪 Ireland started Plan II",
  "🔄 120TH/s added from 🇵🇹 Portugal",
  "💠 User in 🇷🇴 Romania mined 0.00035 BTC",
  "⚡ User in 🇭🇷 Croatia upgraded to Plan IV",
  "🔄 80TH/s added from 🇸🇰 Slovakia",
  "💠 User in 🇱🇹 Lithuania mined 0.00028 BTC",
  "⚡ New user from 🇱🇻 Latvia started Plan III",
  "🔄 95TH/s added from 🇸🇮 Slovenia",
  "💠 User in 🇪🇪 Estonia mined 0.00036 BTC",
  "⚡ User in 🇧🇬 Bulgaria upgraded to Plan II",
  "🔄 60TH/s added from 🇨🇾 Cyprus",
  "💠 User in 🇲🇹 Malta mined 0.00029 BTC",
  "⚡ New user from 🇲🇩 Moldova started Plan I",
  "🔄 40TH/s added from 🇧🇦 Bosnia & Herzegovina",
  "💠 User in 🇷🇸 Serbia mined 0.00031 BTC",
  "⚡ User in 🇲🇰 North Macedonia upgraded to Plan IV",
  "🔄 70TH/s added from 🇦🇱 Albania",
  "💠 User in 🇬🇷 Greece mined 0.00034 BTC",
  "⚡ New user from 🇨🇷 Costa Rica started Plan II",
  "🔄 110TH/s added from 🇵🇦 Panama",
  "💠 User in 🇨🇺 Cuba mined 0.00038 BTC",
  "⚡ User in 🇯🇲 Jamaica upgraded to Plan III",
  "🔄 85TH/s added from 🇧🇸 Bahamas",
  "💠 User in 🇹🇹 Trinidad & Tobago mined 0.00032 BTC",
  "⚡ New user from 🇧🇧 Barbados started Plan I",
  "🔄 50TH/s added from 🇱🇨 Saint Lucia",
  "💠 User in 🇬🇩 Grenada mined 0.00030 BTC",
  "⚡ User in 🇦🇬 Antigua & Barbuda upgraded to Plan II",
  "🔄 45TH/s added from 🇩🇲 Dominica",
  "💠 User in 🇸🇧 Solomon Islands mined 0.00037 BTC",
  "⚡ New user from 🇫🇯 Fiji started Plan III",
  "🔄 90TH/s added from 🇻🇺 Vanuatu",
  "💠 User in 🇰🇮 Kiribati mined 0.00029 BTC",
  "⚡ User in 🇲🇼 Malawi upgraded to Plan IV",
  "🔄 60TH/s added from 🇲🇿 Mozambique",
  "💠 User in 🇹🇿 Tanzania mined 0.00033 BTC",
  "⚡ New user from 🇺🇬 Uganda started Plan II",
  "🔄 55TH/s added from 🇷🇼 Rwanda",
  "💠 User in 🇧🇼 Botswana mined 0.00031 BTC",
  "⚡ User in 🇿🇲 Zambia upgraded to Plan I",
  "🔄 70TH/s added from 🇿🇼 Zimbabwe",
  "💠 User in 🇳🇦 Namibia mined 0.00028 BTC",
  "⚡ New user from 🇱🇸 Lesotho started Plan III",
  "🔄 65TH/s added from 🇸🇿 Eswatini",
  "💠 User in 🇲🇺 Mauritius mined 0.00035 BTC",
  "⚡ User in 🇰🇪 Kenya upgraded to Plan IV",
  "🔄 100TH/s added from 🇬🇲 Gambia",
  "💠 User in 🇸🇳 Senegal mined 0.00040 BTC",
  "⚡ New user from 🇲🇱 Mali started Plan I",
  "🔄 85TH/s added from 🇧🇫 Burkina Faso",
  "💠 User in 🇨🇮 Ivory Coast mined 0.00032 BTC",
  "⚡ User in 🇬🇭 Ghana upgraded to Plan II",
  "🔄 90TH/s added from 🇱🇷 Liberia",
  "💠 User in 🇱🇾 Libya mined 0.00034 BTC",
  "⚡ New user from 🇪🇹 Ethiopia started Plan III",
  "🔄 120TH/s added from 🇩🇿 Algeria",
  "💠 User in 🇲🇦 Morocco mined 0.00036 BTC",
  "⚡ User in 🇹🇳 Tunisia upgraded to Plan IV",
  "🔄 95TH/s added from 🇸🇩 Sudan",
  "💠 User in 🇪🇷 Eritrea mined 0.00031 BTC",
  "⚡ New user from 🇸🇱 Sierra Leone started Plan II",
  "🔄 70TH/s added from 🇬🇳 Guinea",
  "💠 User in 🇧🇮 Burundi mined 0.00033 BTC",
  "⚡ User in 🇨🇬 Congo upgraded to Plan I",
  "🔄 75TH/s added from 🇨🇩 DRC",
  "💠 User in 🇲🇬 Madagascar mined 0.00030 BTC",
  "⚡ New user from 🇲🇷 Mauritania started Plan III",
  "🔄 55TH/s added from 🇹🇬 Togo",
  "💠 User in 🇧🇯 Benin mined 0.00029 BTC",
  "⚡ User in 🇳🇪 Niger upgraded to Plan IV",
  "🔄 60TH/s added from 🇹🇩 Chad",
  "💠 User in 🇨🇲 Cameroon mined 0.00035 BTC"
];


    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ currentIndex }) => ({
        currentIndex: (currentIndex + 1) % this.activities.length,
      }));
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { currentIndex } = this.state;
    return (
      <div className="blinkingDotcontainer">
      <div className="container">
        <div className="blinkingDot"></div>
        <div className="text">{this.activities[currentIndex]}</div>
      </div>
      </div>
    );
  }
}

export default GlobalMiningActivity;

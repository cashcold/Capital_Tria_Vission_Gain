// src/utils/Activities.js
class Activities {
  constructor() {
    this.countriesBTC = [
  { country: "Nigeria", flag: "🇳🇬" },
  { country: "Germany", flag: "🇩🇪" },
  { country: "Canada", flag: "🇨🇦" },
  { country: "Brazil", flag: "🇧🇷" },
  { country: "India", flag: "🇮🇳" },
  { country: "Japan", flag: "🇯🇵" },
  { country: "South Africa", flag: "🇿🇦" },
  { country: "United Kingdom", flag: "🇬🇧" },
  { country: "United States", flag: "🇺🇸" },
  { country: "Argentina", flag: "🇦🇷" },
  { country: "Australia", flag: "🇦🇺" },
  { country: "Italy", flag: "🇮🇹" },
  { country: "Kenya", flag: "🇰🇪" },
  { country: "France", flag: "🇫🇷" },
  { country: "China", flag: "🇨🇳" },
  { country: "Ghana", flag: "🇬🇭" },
  { country: "Russia", flag: "🇷🇺" },
  { country: "United Arab Emirates", flag: "🇦🇪" },
  { country: "Egypt", flag: "🇪🇬" },
  { country: "Mexico", flag: "🇲🇽" },
  { country: "Netherlands", flag: "🇳🇱" },
  { country: "South Korea", flag: "🇰🇷" },
  { country: "Sweden", flag: "🇸🇪" },
  { country: "Spain", flag: "🇪🇸" },
  { country: "Poland", flag: "🇵🇱" },
  { country: "Turkey", flag: "🇹🇷" },
  { country: "Belgium", flag: "🇧🇪" },
  { country: "Indonesia", flag: "🇮🇩" },
  { country: "Switzerland", flag: "🇨🇭" },
  { country: "Singapore", flag: "🇸🇬" },
  { country: "Philippines", flag: "🇵🇭" },
  { country: "Czech Republic", flag: "🇨🇿" },
  { country: "Hungary", flag: "🇭🇺" },
  { country: "Thailand", flag: "🇹🇭" },
  { country: "Israel", flag: "🇮🇱" },
  { country: "Colombia", flag: "🇨🇴" },
  { country: "Austria", flag: "🇦🇹" },
  { country: "Denmark", flag: "🇩🇰" },
  { country: "Norway", flag: "🇳🇴" },
  { country: "Finland", flag: "🇫🇮" },
  { country: "Ireland", flag: "🇮🇪" },
  { country: "Portugal", flag: "🇵🇹" },
  { country: "Romania", flag: "🇷🇴" },
  { country: "Croatia", flag: "🇭🇷" },
  { country: "Slovakia", flag: "🇸🇰" },
  { country: "Lithuania", flag: "🇱🇹" },
  { country: "Latvia", flag: "🇱🇻" },
  { country: "Slovenia", flag: "🇸🇮" },
  { country: "Estonia", flag: "🇪🇪" },
  { country: "Bulgaria", flag: "🇧🇬" },
  { country: "Cyprus", flag: "🇨🇾" },
  { country: "Malta", flag: "🇲🇹" },
  { country: "Moldova", flag: "🇲🇩" },
  { country: "Bosnia & Herzegovina", flag: "🇧🇦" },
  { country: "Serbia", flag: "🇷🇸" },
  { country: "North Macedonia", flag: "🇲🇰" },
  { country: "Albania", flag: "🇦🇱" },
  { country: "Greece", flag: "🇬🇷" },
  { country: "Costa Rica", flag: "🇨🇷" },
  { country: "Panama", flag: "🇵🇦" },
  { country: "Cuba", flag: "🇨🇺" },
  { country: "Jamaica", flag: "🇯🇲" },
  { country: "Bahamas", flag: "🇧🇸" },
  { country: "Trinidad & Tobago", flag: "🇹🇹" },
  { country: "Barbados", flag: "🇧🇧" },
  { country: "Saint Lucia", flag: "🇱🇨" },
  { country: "Grenada", flag: "🇬🇩" },
  { country: "Antigua & Barbuda", flag: "🇦🇬" },
  { country: "Dominica", flag: "🇩🇲" },
  { country: "Solomon Islands", flag: "🇸🇧" },
  { country: "Fiji", flag: "🇫🇯" },
  { country: "Vanuatu", flag: "🇻🇺" },
  { country: "Kiribati", flag: "🇰🇮" },
  { country: "Malawi", flag: "🇲🇼" },
  { country: "Mozambique", flag: "🇲🇿" },
  { country: "Tanzania", flag: "🇹🇿" },
  { country: "Uganda", flag: "🇺🇬" },
  { country: "Rwanda", flag: "🇷🇼" },
  { country: "Botswana", flag: "🇧🇼" },
  { country: "Zambia", flag: "🇿🇲" },
  { country: "Zimbabwe", flag: "🇿🇼" },
  { country: "Namibia", flag: "🇳🇦" },
  { country: "Lesotho", flag: "🇱🇸" },
  { country: "Eswatini", flag: "🇸🇿" },
  { country: "Mauritius", flag: "🇲🇺" },
  { country: "Senegal", flag: "🇸🇳" },
  { country: "Mali", flag: "🇲🇱" },
  { country: "Burkina Faso", flag: "🇧🇫" },
  { country: "Ivory Coast", flag: "🇨🇮" },
  { country: "Liberia", flag: "🇱🇷" },
  { country: "Libya", flag: "🇱🇾" },
  { country: "Ethiopia", flag: "🇪🇹" },
  { country: "Algeria", flag: "🇩🇿" },
  { country: "Morocco", flag: "🇲🇦" },
  { country: "Tunisia", flag: "🇹🇳" },
  { country: "Sudan", flag: "🇸🇩" },
  { country: "Eritrea", flag: "🇪🇷" },
  { country: "Sierra Leone", flag: "🇸🇱" },
  { country: "Guinea", flag: "🇬🇳" },
  { country: "Burundi", flag: "🇧🇮" },
  { country: "Congo", flag: "🇨🇬" },
  { country: "Democratic Republic of the Congo", flag: "🇨🇩" },
  { country: "Madagascar", flag: "🇲🇬" },
  { country: "Mauritania", flag: "🇲🇷" },
  { country: "Togo", flag: "🇹🇬" },
  { country: "Benin", flag: "🇧🇯" },
  { country: "Niger", flag: "🇳🇪" },
  { country: "Chad", flag: "🇹🇩" },
  { country: "Cameroon", flag: "🇨🇲" }
];


    this.plans = ["Plan I", "Plan II", "Plan III", "Plan IV"];
    this.speedUnits = ["MH/s", "TH/s", "GH/s"];
   this.speedCountries = [
  { country: "Canada", flag: "🇨🇦" },
  { country: "Japan", flag: "🇯🇵" },
  { country: "USA", flag: "🇺🇸" },
  { country: "China", flag: "🇨🇳" },
  { country: "Italy", flag: "🇮🇹" },
  { country: "Netherlands", flag: "🇳🇱" },
  { country: "Germany", flag: "🇩🇪" },
  { country: "United Kingdom", flag: "🇬🇧" },
  { country: "France", flag: "🇫🇷" },
  { country: "South Korea", flag: "🇰🇷" },
  { country: "Australia", flag: "🇦🇺" },
  { country: "Brazil", flag: "🇧🇷" },
  { country: "India", flag: "🇮🇳" },
  { country: "Russia", flag: "🇷🇺" },
  { country: "Spain", flag: "🇪🇸" },
  { country: "Sweden", flag: "🇸🇪" },
  { country: "Switzerland", flag: "🇨🇭" },
  { country: "Belgium", flag: "🇧🇪" },
  { country: "Mexico", flag: "🇲🇽" },
  { country: "Singapore", flag: "🇸🇬" },
  { country: "Norway", flag: "🇳🇴" },
  { country: "Finland", flag: "🇫🇮" },
  { country: "Poland", flag: "🇵🇱" },
  { country: "New Zealand", flag: "🇳🇿" },
  { country: "Austria", flag: "🇦🇹" },
  { country: "Ireland", flag: "🇮🇪" },
  { country: "Portugal", flag: "🇵🇹" },
  { country: "Denmark", flag: "🇩🇰" },
  { country: "Czech Republic", flag: "🇨🇿" },
  { country: "Hungary", flag: "🇭🇺" },
  { country: "South Africa", flag: "🇿🇦" },
  { country: "Turkey", flag: "🇹🇷" },
  { country: "United Arab Emirates", flag: "🇦🇪" },
  { country: "Saudi Arabia", flag: "🇸🇦" },
  { country: "Chile", flag: "🇨🇱" },
  { country: "Colombia", flag: "🇨🇴" },
  { country: "Argentina", flag: "🇦🇷" },
  { country: "Malaysia", flag: "🇲🇾" },
  { country: "Thailand", flag: "🇹🇭" },
  { country: "Vietnam", flag: "🇻🇳" },
  { country: "Indonesia", flag: "🇮🇩" },
  { country: "Philippines", flag: "🇵🇭" },
  { country: "Pakistan", flag: "🇵🇰" },
  { country: "Bangladesh", flag: "🇧🇩" },
  { country: "Egypt", flag: "🇪🇬" },
  { country: "Morocco", flag: "🇲🇦" },
  { country: "Nigeria", flag: "🇳🇬" },
  { country: "Kenya", flag: "🇰🇪" },
  { country: "Ghana", flag: "🇬🇭" },
  { country: "Israel", flag: "🇮🇱" },
  { country: "Qatar", flag: "🇶🇦" },
  { country: "Kuwait", flag: "🇰🇼" },
  { country: "Jordan", flag: "🇯🇴" },
  { country: "Lebanon", flag: "🇱🇧" },
  { country: "Iraq", flag: "🇮🇶" },
  { country: "Ukraine", flag: "🇺🇦" },
  { country: "Belarus", flag: "🇧🇾" },
  { country: "Kazakhstan", flag: "🇰🇿" }
];


    this.activities = this.generateActivities(100);
  }

  getRandomBTC(min = 0.00028, max = 0.00055) {
    return (Math.random() * (max - min) + min).toFixed(5);
  }

  getRandomSpeed() {
    const amount = Math.floor(Math.random() * 500) + 10;
    const unit = this.speedUnits[Math.floor(Math.random() * this.speedUnits.length)];
    return `${amount}${unit}`;
  }

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  generateActivities(count) {
    const activities = [];
    for (let i = 0; i < count; i++) {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const user = this.pickRandom(this.countriesBTC);
        activities.push(`💠 User in ${user.flag} ${user.country} just mined ${this.getRandomBTC()} BTC`);
      } else if (type === 1) {
        const user = this.pickRandom(this.countriesBTC);
        const plan = this.pickRandom(this.plans);
        activities.push(`⚡ New user from ${user.flag} ${user.country} started ${plan}`);
      } else {
        const speed = this.getRandomSpeed();
        const user = this.pickRandom(this.speedCountries);
        activities.push(`🔄 ${speed} added from ${user.flag} ${user.country}`);
      }
    }
    return activities;
  }
}

export default Activities;

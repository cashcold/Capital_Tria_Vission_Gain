const axios = require('axios');

async function testEndpoints() {
  const userId = '69946dc8e32d22a3b1454f8e';
  const amount = 100;

  try {
    console.log('Testing check-tier-usage...');
    const tierRes = await axios.get(`http://localhost:8000/users/check-tier-usage/${userId}/${amount}`);
    console.log('Tier response:', JSON.stringify(tierRes.data, null, 2));

    console.log('\nTesting check-profit-limit...');
    const profitRes = await axios.get(`http://localhost:8000/users/check-profit-limit/${userId}/${amount}`);
    console.log('Profit response:', JSON.stringify(profitRes.data, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testEndpoints();
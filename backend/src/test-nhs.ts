import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.NHS_API_KEY;
const apiSecret = process.env.NHS_API_SECRET;
console.log('API Key:', apiKey ? `${apiKey.substring(0, 5)}...` : 'MISSING');
console.log('API Secret:', apiSecret ? `${apiSecret.substring(0, 5)}...` : 'MISSING');

const testEndpoints = [
    'https://api.nhs.uk/mental-health/',
    'https://api.nhs.uk/conditions/contraception/',
    'https://api.nhs.uk/live-well/sexual-health/',
    'https://api.service.nhs.uk/nhs-website-content/conditions/mental-health',
    'https://api.service.nhs.uk/nhs-website-content/live-well/sexual-health'
];

const headerNames = ['subscription-key', 'apikey', 'ocp-apim-subscription-key'];

async function test() {
    const basicAuth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    for (const endpoint of testEndpoints) {
        console.log(`\n--- Testing Endpoint: ${endpoint} ---`);

        // Try Header Variations
        for (const headerName of headerNames) {
            try {
                console.log(`Trying header: ${headerName}`);
                const response = await axios.get(endpoint, {
                    headers: { [headerName]: apiKey },
                    timeout: 5000
                });
                console.log(`SUCCESS! Header: ${headerName}, Status: ${response.status}`);
                // Log some of the data to verify structure
                console.log('Data summary:', JSON.stringify(response.data).substring(0, 200));
                break;
            } catch (error: any) {
                console.log(`FAILED! Header: ${headerName}, Status: ${error.response?.status}`);
            }
        }

        // Try Basic Auth
        try {
            console.log('Trying Basic Auth');
            const response = await axios.get(endpoint, {
                headers: { 'Authorization': `Basic ${basicAuth}` },
                timeout: 5000
            });
            console.log(`SUCCESS! Basic Auth, Status: ${response.status}`);
            console.log('Data summary:', JSON.stringify(response.data).substring(0, 200));
        } catch (error: any) {
            console.log(`FAILED! Basic Auth, Status: ${error.response?.status}`);
        }
    }
}

test();

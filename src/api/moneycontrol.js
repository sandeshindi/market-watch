import axios from 'axios';

const indian = axios.create({
    baseURL : 'https://priceapi-aws.moneycontrol.com/pricefeed/notapplicable/inidicesindia/'
});

const global = axios.create({
    baseURL : 'https://priceapi.moneycontrol.com/pricefeed/notapplicable/indicesglobal'
});

export { indian, global };
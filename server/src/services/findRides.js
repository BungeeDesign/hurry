const axios = require('axios');
const moment = require('moment');

const foundRides = [];

async function findRide() {

  const rideData = {
    currentLocation: {
      lat: '50.816',
      long: '-0.359663'
    },
    destinationLocation: {
      lat: '50.82487',
      long: '-0.313832'
    }
  };


  const vendorApis = [
    {
      vendor: 'Arrow',
      waitTimeRoute: (rideCoords) => `https://mobi.icabbi.com/texitxt/private/mobileapp/zoneinfov1?longitude=${rideCoords.currentLocation.long}&taxiCompanyId=407&latitude=${rideCoords.currentLocation.lat}`,
      ridePriceRoute: (rideCoords) => `https://mobi.icabbi.com/texitxt/private/mobileapp/quotev1?destLatitude=${rideCoords.destinationLocation.lat}&uuid=EAC8C352-FA25-4B4D-AB43-01439481BEDB&pickupLatitude=${rideCoords.currentLocation.lat}&destLongitude=${rideCoords.destinationLocation.long}&numberOfPassengers=4&date=${encodeURIComponent(moment().format('YYYY-MM-DD HH:mm:ss'))}&taxiCompanyId=407&pickupLongitude=${rideCoords.currentLocation.long}`
    }
  ];

  // Iterate through Ride Vendors (for of more effiant than forEach, also handles async/await)
  for (const vendor of vendorApis) {
    try {
      const waitTimeRes = await axios.post(vendor.waitTimeRoute(rideData));
      const ridePriceRes = await axios.post(vendor.ridePriceRoute(rideData));
      await processRides(vendor.vendor, waitTimeRes.data, ridePriceRes.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  console.log('FOUND RIDES: ', foundRides);
}
findRide();

async function processRides(vendor, waitTimeRes, ridePriceRes) {
  switch (vendor) {
    case 'Arrow':
      foundRides.push({
        id: 0,
        vendor: 'Arrow',
        eta: waitTimeRes.waitTime,
        price: ridePriceRes.prices[0].maximumPrice,
        car: 'N/A',
        passenger: 4,
        driver: 'N/A',
        raiting: 3,
        fastest: true
      });
      break;
    default:
      break;
  }
};
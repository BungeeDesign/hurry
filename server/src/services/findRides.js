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
    },
    {
      vendor: 'Uber',
      waitTimeRoute: () => `https://m.uber.com/api/getStatus`,
      ridePriceRoute: () => `https://m.uber.com/api/getFareEstimates`
    }
  ];

  // Iterate through Ride Vendors (for of more effiant than forEach, also enables use of async/await)
  for (const vendor of vendorApis) {
    try {
      let waitTimeRes;
      let ridePriceRes;

      if (vendor.vendor == 'Arrow') {
        waitTimeRes = await axios.post(vendor.waitTimeRoute(rideData));
        ridePriceRes = await axios.post(vendor.ridePriceRoute(rideData));

        await processRides(vendor.vendor, waitTimeRes.data, ridePriceRes.data);
      } else if (vendor.vendor == 'Uber') {
        const config = {
          headers: {
            'authority': 'm.uber.com',
            'sec-fetch-dest': 'empty',
            'x-csrf-token': 'x',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'content-type': 'application/json',
            'accept': '*/*',
            'origin': 'https://m.uber.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'referer': 'https://m.uber.com/looking?_ga=2.268269958.945521108.1584123715-1223318604.1583206489&drop=%7B%22id%22%3A%22ChIJ6wG228mZdUgRR_5KkIxtxsg%22%2C%22addressLine1%22%3A%22BN15%208BY%22%2C%22addressLine2%22%3A%22Seaside%20Ave%2C%20Lancing%22%2C%22provider%22%3A%22google_places%22%2C%22locale%22%3A%22en%22%2C%22latitude%22%3A50.825116699999995%2C%22longitude%22%3A-0.31436%7D&pickup=%7B%22id%22%3A%22ChIJB8T45XCYdUgR18SzHmUEvwI%22%2C%22addressLine1%22%3A%22BN11%202DF%22%2C%22addressLine2%22%3A%22Lyndhurst%20Rd%2C%20Worthing%22%2C%22provider%22%3A%22google_places%22%2C%22locale%22%3A%22en%22%2C%22latitude%22%3A50.8159862%2C%22longitude%22%3A-0.3594281%7D&state=lhG3tvEZjwItdnE1OD4ZKI87G5OtmVzhT0cA47sAEhg%3D',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': 'segmentCookie=b; _gcl_au=1.1.1464321596.1583206489; _ga=GA1.2.1223318604.1583206489; marketing_vistor_id=dd13852a-f244-420f-9ad2-2e04dee8a8a8; CONSENTMGR=ts:1583279449598%7Cconsent:true; sid=QA.CAESEBMio7-_mkkbl0UXXDWEjGUY6_SZ9AUiATEqJGZlMjRhMzBkLTIwNWEtNDZkYy04ZmY1LTg1NWE4OTRkMGExOTJAfxB7atiQ0TK9048X1D6YuKcNvT8NN5IfkLEnOLJD4qcl02L02p2YOQVtFurVrtsRHlUP5G0dLn8e_PUHz_tTYjoBMUIIdWJlci5jb20.JtMG-V9wzyK7ak7G5sOcX2t5mWYhxbhTl1ph0PHtZ_4; _fbp=fb.1.1583280758711.1132807914; udi-id=l5iBWAFoOjSD90L0daePtefvILtaQm2GdNGVGRN8qph78tLyCYUmRNPOjHRgdsuOZ2AKeHQiasp+DuwfM6iAc9+3pHafiwxNF5ytUG179yHP0u6xhUHp0fyXyu9N8l4TtbBAJIBq8VRz/opUx/gU/bClZidts8WIcrFJXhfi9GJg/40mNhywBMIWxwfgD+e+8lpTRq8DngU+9ugl8jBnRA==QyUAm3bWuqHz481/wMhlUQ==RAGtd+UgBte7V/Emao0PSRHMhA2Ne2bnOGbYsFZH+SA=; _cc=AeHuoQwPqOLcLOwZ1UPOBFhk; _RCRTX03=d3ffa4c45efb11ea9790e33388e4af941ad3c419c62f4d9685a0cb77902334e8; _RCRTX03-samesite=d3ffa4c45efb11ea9790e33388e4af941ad3c419c62f4d9685a0cb77902334e8; optimizelyEndUserId=oeu1583427434354r0.08008689371932887; _mkto_trk=id:732-DID-644&token:_mch-uber.com-1583427434738-83355; _hjid=81d03e44-7cda-4db8-aa4e-dda1d1bec572; AMP_TOKEN=%24NOT_FOUND; _gid=GA1.2.945521108.1584123715; fsid=gg58f97l-cbhn-jmuu-s01s-xvw213z9x809; _ua={"session_id":"6cf6da97-011c-4511-99c9-88c61d501f48","session_time_ms":1584123721494}; jwt-session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODQxMjM3MjEsImV4cCI6MTU4NDIxMDEyMX0.WUFsp_30asj4CcxO2ecMl4idLevjfwErAzGxp78INIM; csid=1.1586715721614.Imne37XAr908G6ZbJDk3GlSNxqAJx8vF4fDFVJxunUs=; privacyStatment=This website uses third party cookies in order to serve you relevant ads. You can opt out of third party cookies by visiting our <a target="_blank" href="https://www.uber.com/global/en/privacy/notice/">cookie statement</a>.; newVsReturning=undefined; udi-fingerprint=vlTK4WhvuV5F1+2E5CjQ46lcaqA02Px1oJGjiq9oA3QTdJYJh+sXyPBAE9XedtcKxrrh0bpozpmTzA1y2uTWmA==hKj2lpKxknH/W30jr3/8gCYDyiIeqNre4VCQ+3hRTGg=; utag_main=v_id:01709e75d8c6000300eb81a2024503073001b06b00fb8$_sn:7$_ss:0$_st:1584125862558$segment:a$optimizely_segment:b$userid:fe24a30d-205a-46dc-8ff5-855a894d0a19$_se:23$ses_id:1584123714666%3Bexp-session$_pn:2%3Bexp-session'
          }
        }

        const postData = { "uuid":"fe24a30d-205a-46dc-8ff5-855a894d0a19","latitude": parseFloat(rideData.currentLocation.lat),"longitude": parseFloat(rideData.currentLocation.long) };

        let waitTimeRes = await axios.post(vendor.waitTimeRoute(), postData, config);
        let ridePriceRes = { data: 'n/a'}
        
        // Transform the nearbyVehicles object into an array get the key and itterate through all of the nearby vehicles.
        Object.keys(waitTimeRes.data.data.status.eyeball.nearbyVehicles).forEach(async e => {
          if (waitTimeRes.data.data.status.eyeball.nearbyVehicles[e].minEta != null ) {
            console.log(waitTimeRes.data.data.status.eyeball.nearbyVehicles[e].minEta);
            await processRides(vendor.vendor, waitTimeRes.data.data.status.eyeball.nearbyVehicles[e].minEta, ridePriceRes.data);
          }
        });

      }
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
    case 'Uber':
      foundRides.push({
        id: 0,
        vendor: 'Uber',
        eta: waitTimeRes,
        price: '🏗 In Progress',
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

  // Filter out the app vendors that the user does not have
  
};
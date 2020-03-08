const axios = require('axios');

const UBER_AUTH = 'crd.EA.CAESEF0QdYWL6kxYobg2gv2y9iEiATE.Z1zkVhY0ep3Hh3nNNeR1bY_oM1BbEzo5F3klp_trxBc&state=D_7Lv7aLvkXk3tQRjw4j5-MmmzTu2DIn-9WZOz0V3d0%3D#_';
const REDIRECT_URI = 'http://localhost';


(async function init() {
  console.log('Testing');

  try {
    // const res = await axios.post(`https://login.uber.com/oauth/v2/token?client_id=y5ZLmLPGcC_C7VtpmMH9COQu_IZ_HbrN&client_secret=4lz1hw_BgVHoInjPVb13SvChCyTjfhsKWt3CYhgg&grant_type=authorization_code&redirect_uri=http://localhost&code=${UBER_AUTH}`);
    // console.log(res.data);
  
    const config = {
      headers: {
        // Authorization: `Bearer JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAH4AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAzAAAABwAAAAEAAAAEAAAAM6QMhjkWyK8bng3Xo4JH2OnAAAA93dAjFXjRhGh8WCq7ntMY2fymIngErFTdR_iiwTd8jkKRcFCI4Y3fa9-4O2pNzUzzrdcaFTPEe4agk1XA7xAKRXQoaH-eMOvX4RRBTXTnLU_7EH96q5oGWL_q2do1O0AIDLz4JEzE_u5RasvT3xowJIrE1mjp0OFl0N7wZpYpC34AmsCm3QwvrsdjOTVdcBlEvNjXnu9m0MdN2zWMYdFdo3RulbwpwwADAAAAOjx32YZvZvhZIoLsyQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU`,
        "Content-Type": "application/json",
        "Accept-Language": "en_US"
      }
    }
  
    const productsRes = await axios.get('https://api.uber.com/v1.2/products?latitude=51.003&longitude=-50.005', config);
    console.log(productsRes.data);
  } catch (error) {
   console.log(error); 
  }
})();

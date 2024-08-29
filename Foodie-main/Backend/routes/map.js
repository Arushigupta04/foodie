// const express = require("express");
// const googleMaps = require('@googlemaps/google-maps-services-js');

// const googleMapsClient = new googleMaps.Client({});
// const router = express.Router();

// router.get('/', async (req, res) => {
//     const { address } = req.query;
//     try {
//       const response = await googleMapsClient.geocode({
//         params: {
//           address,
//           key: 'YOUR_GOOGLE_MAPS_API_KEY',
//         },
//       });
//       res.json(response.data);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// module.exports = router;
import Polyline from '@mapbox/polyline';

function PolylineDecoder(encodedPolyline) {
  let decodedPolyline = Polyline.decode(encodedPolyline);
  let resultLatLngArray = [];

  for (let i = 0; i < decodedPolyline.length; i++) {
    resultLatLngArray.push({
      latitude: decodedPolyline[i][0],
      longitude: decodedPolyline[i][1]
    });
  }
  return resultLatLngArray;
}

export default PolylineDecoder;
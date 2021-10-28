type GeoLocation = {
  latitude: number;
  longitude: number;
};

export function getDistanceBetweenCoordinates(
  firstLocation: GeoLocation,
  secondLocation: GeoLocation
) {
  var R = 6371;
  var dLat = deg2rad(secondLocation.latitude - firstLocation.latitude);
  var dLon = deg2rad(secondLocation.longitude - firstLocation.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(firstLocation.latitude)) *
      Math.cos(deg2rad(secondLocation.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

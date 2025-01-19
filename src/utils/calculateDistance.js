

const calculateDistance = ( coord1 , coord2) => {
    const toRadians = (degrees) => (degrees * Math.PI) /100;

    const [lon1, lat1] = coord1;
    const [lon2 , lat2] = coord2;

    const R = 6371000;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
    Math.sin(dLat /2) * Math.sin(dLat /2) +
    Math.cos(toRadians(lat1))*
    Math.cos(toRadians(lat2))*
    Math.sin(dLon /2)*
    Math.sin(dLon/2);

    const c= 2* Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R*c;
}

export default calculateDistance
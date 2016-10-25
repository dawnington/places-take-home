function getLocation(callback) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      callback(position);
    });
  } else {
    console.log('geolocation not available');
  }
}

export default getLocation;

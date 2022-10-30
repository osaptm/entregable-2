import { useState, useEffect } from 'react'

const useGeoLocation = () => {
    const [GeoEstate, setGeoEstate] = useState(false)   
    const [Latitude, setLatitude] = useState(0) 
    const [Longitude, setLongitude] = useState(0) 
    const [Accuracy, setAccuracy] = useState(0) 

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
    function success(pos) {
        setGeoEstate(true);
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setAccuracy(pos.coords.accuracy);      
      }
      
    function error(err) {
        setGeoEstate(false);
          switch(error.code) {
            case error.PERMISSION_DENIED:              
                console.log("El usuario denegó el permiso para la Geolocalización.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("La ubicación no está disponible.");
                break;
            case error.TIMEOUT:
                console.log("Se ha excedido el tiempo para obtener la ubicación.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("Un error desconocido.");
                break;
        }
      }
      
      function accessGeo () {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, error, options);
        }else{
            setGeoEstate(false);
        }
      }

     useEffect(() => {
         navigator.geolocation.getCurrentPosition(success, error, options);
     }, []);

    return {GeoEstate, Latitude, Longitude, Accuracy, accessGeo};
};

export default useGeoLocation;
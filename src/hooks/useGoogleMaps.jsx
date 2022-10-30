import { useState, useEffect } from 'react'

const useGoogleMaps = (Latitude,Longitude) => {
    const [ObjGoogleMaps, setObjGoogleMaps] = useState({});

    useEffect(()=>{ 
        if(Latitude!==0 && Longitude!==0){
            const latLng = `${Latitude}, ${Longitude}`; 
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=AIzaSyCLv2OMZ7-1-4Q1FTrrYX6q2feJhlBpYQI`)
            .then((responseText) => {
                return responseText.json();
            })
            .then(jsonData => {
                setObjGoogleMaps(jsonData.results[0]);
            })
            .catch(error => {
                console.log(error);
            })
        }       
    },[Latitude, Longitude]);
    
    return {ObjGoogleMaps}
};

export default useGoogleMaps;
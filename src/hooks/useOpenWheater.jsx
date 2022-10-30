import { useState, useEffect } from 'react'
import axios from 'axios'
import obj from '../obj.json'

const useOpenWheater = (Latitude,Longitude) => {   
  const [ObjOpenWheater, setObjOpenWheater] = useState({});

  useEffect(() => {
    if(Latitude!==0 && Longitude!==0){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=1592a7c8460296fecc3a98911bef2805`)
      .then(json => {         
        setObjOpenWheater(json.data);
        console.log(json.data);
      })
      //setObjOpenWheater(obj);
    }
  }, [Latitude, Longitude]); 

  return {ObjOpenWheater}
};

export default useOpenWheater;
import { useState, useEffect } from 'react'
import axios from 'axios'
import useGeoLocation from './hooks/useGeoLocation'
import useOpenWheater from './hooks/useOpenWheater'
import useGoogleMaps from './hooks/useGoogleMaps';
import imagesWheather from './assets/imagesWheather';


function App() {
  const {GeoEstate, Latitude, Longitude, Accuracy, accessGeo} = useGeoLocation(); 
  const {ObjOpenWheater} = useOpenWheater(Latitude,Longitude);
  const {ObjGoogleMaps} = useGoogleMaps(Latitude,Longitude);
  const [IsCelsiusOrFahrenheit,setIsCelsiusOrFahrenheit] = useState('F');
  const [Grades,setGrades] = useState(0);

  const changeUnitTemperature = () => {
    if(IsCelsiusOrFahrenheit === 'C') {
      setIsCelsiusOrFahrenheit('F');
      setGrades(Math.round((((ObjOpenWheater.main?.temp-273.15)*(9/5)) + 32 + Number.EPSILON) * 100) / 100);
    }
    if(IsCelsiusOrFahrenheit === 'F') {
      setIsCelsiusOrFahrenheit('C');
      setGrades(Math.round(((ObjOpenWheater.main?.temp-273.15) + Number.EPSILON) * 100) / 100);
    }
  }

  useEffect(()=>{  
    document.body.style.backgroundImage = "url('"+imagesWheather["img_"+ObjOpenWheater.weather?.[0].icon]+"')";
    if(Object.keys(ObjOpenWheater).length !== 0 && Object.keys(ObjGoogleMaps).length !== 0){      
      changeUnitTemperature();   
    }
  },[ObjOpenWheater, ObjGoogleMaps]);


    return (
    <>
   
      <div className='card'>
          <h1>Wheather App</h1>
          <h2>
            {
            `${ObjGoogleMaps?.address_components?.[2].long_name}, 
            ${ObjGoogleMaps?.address_components?.[3].long_name}, 
            ${ObjGoogleMaps?.address_components?.[5].long_name},
            ${ObjGoogleMaps?.address_components?.[6].long_name}`
            }
          </h2>
          <div className='data-wheather'>
              <div className='temperature'>
                {
                (ObjOpenWheater.weather?.[0].icon!==undefined)?
                  (<img src={"https://openweathermap.org/img/wn/"+ObjOpenWheater.weather?.[0].icon+"@4x.png"} alt="" width="200" height="200" />)
                :
                  ("")
                }             
                <h2>{Grades}{" "}{IsCelsiusOrFahrenheit}º</h2>
              </div>
              <div className='other-data'>
                <h2>Scattered clouds</h2>
                <p><i className="fa-solid fa-wind"></i>Wind Speed: {ObjOpenWheater.wind?.speed} m/s</p>
                <p><i className="fa-solid fa-cloud"></i>Clouds: {ObjOpenWheater.clouds?.all}%</p>
                <p><i className="fa-solid fa-temperature-half"></i>Pressure: {ObjOpenWheater.main?.pressure} mb</p>
                <p><i className="fa-brands fa-drupal"></i>Humidity: {ObjOpenWheater.main?.humidity}%</p>
              </div>
          </div>

          <button onClick={changeUnitTemperature} className="buttonDegrees">Degrees Fº / Cº</button>
      </div>
    </>
  )
}

export default App

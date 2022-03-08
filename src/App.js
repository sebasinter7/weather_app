import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

    const [ country, setCountry ] = useState(  )
    const [ city, setCity ] = useState(  )
    const [ temp, setTemp ] = useState(  )
    const [ maxTemp, setMaxTemp ] = useState(  )
    const [ minTemp, setMinTemp ] = useState(  )
    const [ weather, setWeather ] = useState( { } )
    const [ weatherDescription, setWeatherDescription ] = useState(  )
    const [ windSpeed, setWindSpeed ] = useState(  )
    const [ humidity, setHumidity ] = useState(  )
    const [ pressure, setPressure ] = useState(  )
    const [ degrees, setDegrees ] = useState( true )

    const success = pos => {
        const API_Key = '1b402f8ff036066c6ef44161b12f79a1'
        const latitude = pos.coords.latitude
        const longitude = pos.coords.longitude

        axios.get( `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_Key}` )
            
            .then( res => {
                setWeather( res.data )
                setCountry( res.data?.sys.country )
                setCity(res.data.name)
                setTemp( res.data.main.temp )
                setMaxTemp( res.data.main.temp_max )
                setMinTemp( res.data.main.temp_min )
                setWeatherDescription( res.data.weather[ 0 ].description )
                setWindSpeed( res.data.wind.speed )
                setHumidity( res.data.main.humidity )
                setPressure( res.data.main.pressure )
                console.log(res)
              }  )
              
    }

   const convertDegrees = ( ) => {
       if( degrees ){
           setTemp( Math.round(( temp * 9/5) + 32 ))
           setMinTemp( Math.round(( temp * 9/5) + 32 ))
           setMaxTemp( Math.round(( temp * 9/5) + 32 ))
           setDegrees( false )
       } else {
           setTemp( Math.round(( temp - 32 ) * 5/9) )
           setMinTemp( Math.round(( temp - 32 ) * 5/9) )
           setMaxTemp( Math.round(( temp - 32 ) * 5/9) )
           setDegrees( true )
       }
   }

    useEffect( ( ) => {
        navigator.geolocation.getCurrentPosition(success);
    }, [ ] )


  return (
    <div className="App">
        <h1>Weather App</h1>

        <div className='card'>
            <h2> { city }, { country }</h2>
            <div className='information'>
                <div className='temp'>
                    <h3>{ weatherDescription }</h3>
                    <img src={ `http://openweathermap.org/img/wn/${ weather.weather?.[ 0 ].icon }@2x.png` } alt="" />
                    <h3 className='num-temp'>{ Math.round( temp ) }°C</h3>
                    <p>Min-temp: { Math.round( minTemp ) }°C</p>
                    <p>Max-temp: { Math.round( maxTemp ) }°C</p>
                </div>
                <div className='description'>
                    <p><i className="fa-solid fa-wind"></i> <span>Wind speed: </span>{ windSpeed } m/s</p>
                    <p><i className="fa-solid fa-droplet"></i> <span>Humidity: </span>{ humidity } %</p>
                    <p><i className="fa-solid fa-tire-pressure-warning"></i> <span>Pressure: </span>{ pressure } hPa</p>
                    <button onClick={ convertDegrees }>
                        Convert to { degrees ? "°F" : "°C" }
                    </button>
                </div>
            </div>
            
        </div>
      
    </div>
  );
}

export default App;

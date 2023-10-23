import { useState } from 'react'
import Swal from 'sweetalert2'

// details icon & search button
import searchIcon from './assets/search.png'
import humidityIcon from './assets/humidity.png'
import windIcon from './assets/wind.png'

// weather images
import clear from './assets/clear.png'
import clouds from './assets/clouds.png'
import drizzle from './assets/drizzle.png'
import mist from './assets/mist.png'
import snow from './assets/snow.png'
import rain from './assets/rain.png'
//Style
import './App.css'

function App() {

  const [input,setInput] = useState("");
  const [temp,setTemp] = useState("W e l c o m e");
  const [location,setLocation] = useState("- - - - -");
  const [humidity,setHumidity] = useState("- - -");
  const [wind,setWind] = useState("- - -");
  const [images,setImages] = useState(clouds);
  
  async function getWeather(){

  const API_KEY = "b80e7896e8e1e4e1b8687604d0506817";

  let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${input}&appid=${API_KEY}`)

  if(res.status == 400){
    Swal.fire({
      title: 'Bad Request !',
      text: 'Look like Search Box is empty',
      icon: 'error',
      confirmButtonText: 'ok'
    })
      setInput("");
  }else if(res.status == 400){
    Swal.fire({
      title: 'Unauthorized !',
      text: 'Looklike API token did not providen in the request',
      icon: 'question',
      confirmButtonText: 'ok'
    })
    setInput("");
  }else if(res.status == 404){
    Swal.fire({
      title: 'Location Not Found !',
      text: 'Please check location name',
      icon: 'warning',
      confirmButtonText: 'ok'
    })
    setInput("");
  }else{
    let data = await res.json();
    console.log(data);        
    setTemp(Math.round(data.main.temp) + " °C");
    setLocation(data.name);
    setHumidity(data.main.humidity + " %" );
    setWind(data.wind.speed + " Km/h");

    if(data.weather[0].main == 'Clouds'){
        setImages(clouds);
    }
    if(data.weather[0].main == 'Clear'){
        setImages(clear);
    }
    if(data.weather[0].main == 'Drizzle'){
        setImages(drizzle);
    }
    if(data.weather[0].main == 'Mist'){
        setImages(mist);
    }
    if(data.weather[0].main == 'Snow'){
        setImages(snow);
    }
    if(data.weather[0].main == 'Rain'){
        setImages(rain);
    }
    setInput("");
  }
}

  return (
      <main className='min-h-[100vh] w-full flex justify-center items-center'>
        <div id='app' className='max-w-[400px] w-10/12 p-8 border'>
          {/* ---------------------------- input section ----------------------------- */}
          <div className='flex gap-2'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              id='searchBox' 
              className='text-lg flex-1 px-3 h-15 border-none outline-none rounded text-center tracking-widest'          
              type="text" 
              placeholder=' Click me . . .'/>
              <button
                onClick={getWeather}
                className=' w-14 border p-3 rounded border-none outline-none duration-300 hover:scale-125'>
                <img 
                  className='w-full h-full'
                  src={searchIcon} 
                  alt="search-icon" />
              </button>
          </div>
          {/*-------------------------- Display section -----------------------------*/}
          <div className='flex flex-col justify-center items-center'>
            {/* ------- Weather Icon ------*/}
            <img
              id='weatherImage'
              className='w-52'
              src={images}
              alt="weather-icon" />
            {/*-------- Temperature ---------*/}
            <h1 className='text-6xl text-white text-center'>
              {temp}
            </h1>
            {/*---------- Location ----------*/}
            <h2 className='text-4xl text-white text-center mt-3'>
              {location}
            </h2>
            {/*-------------------------- Details section ----------------------------*/}
            <div className='w-full flex justify-around mt-5'>
              <div className='text-white flex justify-center items-center gap-3'>
                <img id='humidity' className='w-16' src={humidityIcon} alt="humidity-icon" />
                <div>
                  <p className='text-2xl'>Humidity</p>
                  {/*-------- Humidity --------*/}
                  <p className='text-3xl'>
                    {humidity}
                  </p>
                </div>
              </div>
              <div className='text-white flex justify-center items-center gap-3'>
                <img id='wind' className='w-16' src={windIcon} alt="wind-icon" />
                <div>
                  <p className='text-2xl'>Wind</p>
                  {/*------- Wind speed --------*/}
                  <p className='text-3xl'>
                    {wind}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
export default App

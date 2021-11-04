import axios from 'axios';
import { useState } from 'react';
import './App.css';
export const App = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [error, setError] = useState(null)

  const getWeather = () => {
    const ApiKey = '7b4a5bbfb2ade24ae23cfb84edf337c6'
    // document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${value}')`
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${ApiKey}`)
      .then(res => {
        setResponse(res.data)
        setLoading(true)
        setError('')
      })
      .catch(error => {
        setError(error.response.data)
        setLoading(true)
        setResponse('')
      })
  }
  const enter = (e) => {
    if (e.key === 'Enter') {
      getWeather()
    }
  }
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='inputDiv'>
          <div className='divForInput'>
            <input
              type='text'
              onChange={e => setValue(e.target.value)}
              value={value}
              placeholder='Search'
              className='form-control'
              onKeyPress={e => enter(e)}
            />
          </div>
          <button onClick={getWeather} className='mx-2'>
            <i className='fas fa-search'></i>
          </button>
        </div>
        {
          error &&
          <h5 className='mt-2 text-center'>{error.message}</h5>
        }
        {
          loading && response && !error &&
          <>
            <div className='city'>
              <h2 className='m-0'>Weather in {response.name} </h2>
            </div>
            <div className='temp'>
              <h3 className='m-0 mt-2'>{response.main.temp}°C</h3>
            </div>
            <div className='havo'>
              <img alt='' src={`https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`} />
              <h6 className='m-0'>{response.weather[0].description}</h6>
            </div>
            <div className='namlik'>
              <h6>Country: <strong>{response.sys.country}</strong>  </h6>
            </div>
            <div className='namlik'>
              <h6> Humidity: {response.main.humidity}%</h6>
            </div>
            <div className='wind'>
              <h6>
                Wind: {response.wind.speed} km/h
              </h6>
            </div>
          </>
        }
      </div>
    </div>
  )
}

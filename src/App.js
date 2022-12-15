import { useState } from "react";
import React from "react";
import { TbMapSearch} from 'react-icons/tb'
import { TbSearch} from 'react-icons/tb'

import Header from './component/Header'
import DetailsCard  from "./component/DetailsCard";
import SummaryCard from "./component/SummaryCard";

function App() {
  const API_KEY = process.env.API_KEY
  const [noData, setNoData] = useState('No data yet')
  const [wheatherData, setWheatherData] = useState([])
  const [searchTerm, setSearchTerm] = useState([])
  const [city, setCity] = useState('Undifined Location')
  const [wheatherIcon, setWheatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)

  const handleChange = input => {
    const {value} = input.target
    setSearchTerm(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    getWheater(searchTerm)
  }
  const getWheater = async (location) => {
    setWheatherData([])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`
  
    try {
      let res = await fetch(`${process.env.REACT_APP_URL +how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if (data.cod !== 200) {
        setNoData ('Location Not Found!')
        return
      }
      setWheatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWheatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].wheather[0]["icon"]}@4x.png`)
    } catch (error) {
        console.log(error)
    }
  }
  
  const myIp = (location) => {
    const {latitude, longtitude} = location.coords
    getWheater([latitude, longtitude])
  }
  return (
    <div className="container"> 
      <div  className="blur" style={{top: '-10%', right: '0'}}></div>
      <div  className="blur" style={{top: '36%', left: '-6rem'}}></div>
      <div className="content">
        <div className="form-container">
          <div className="name">
            <div className="logo">Wheather App</div>
            <div className="city">
              <TbMapSearch></TbMapSearch>
              <p>{city}</p>
            </div>
          </div>
          <div className="search">
            <h2>The Only Wheather App</h2>
            <hr />
            <form className="search-bar" noValidate onSubmit={handleSubmit}>
              <input type="text" placeholder="#Explore ?" onChange={handleChange} required />
              <button className="s-icon" onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIp)
                    console.log('abc');
                    console.log(wheatherData);
                }}>
                <TbSearch 
                //   onclick={() => {
                //     navigator.geolocation.getCurrentPosition(myIp)
                // }} 
                />
              </button>
            </form>
          </div>
        </div>
        <div className="info-container">
          <Header />
          {wheatherData.length === 0 ?
            <div>
              <div className="nodata">
                <h1>{noData}</h1>
              </div>
            </div> :
            <>
              <h1>Today</h1>
              <DetailsCard wheather_icon={wheatherIcon} data={wheatherData}></DetailsCard>
              <h1 className="title">More On {city}</h1>
              <ul className="summary">
                {wheatherData.list.map((days, index)=>{
                  if(index > 0) {
                    return (<SummaryCard key={index} day={days} />)
                  }

                })}
              </ul>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import L from 'leaflet'
import {  MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import RoutingMaching from './RoutingMachine';



const myMarker = new L.Icon({
  iconUrl : 'https://cdn-icons-png.flaticon.com/512/5165/5165235.png' , 
  iconSize : [40,40], 
  iconAnchor: [17, 46], 
  popupAnchor: [0, -46],
})

const  locations = [
[33.54057196944545,-7.479234475950592],
[33.544971532450006,-7.481443657690096],
[33.54713546297153,-7.4815294511557076],
[33.54464962080019,-7.487030957138102]
]
  

function App() {
  const [position , setPosition] = useState([])





  useEffect(()=>{
    navigator.geolocation.watchPosition((e)=>{
        setPosition([e.coords.latitude , e.coords.longitude])
    })

   

  },[])
  return (
    <div className="App ">
      {position.length >0 ?
      <MapContainer 
      // style={[ro]}
      center={position} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       
        <Marker position={position} icon={myMarker} >
         
        </Marker>
       
        <RoutingMaching userPosition={position}  locations={locations}/>

 
      </MapContainer> : 
      <p>Please allow us to detect your location</p>
      }
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react" 
import { useMap } from "react-leaflet"
import L from 'leaflet'
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { createPortal } from "react-dom";

const myMarker = new L.Icon({
    iconUrl : 'https://cdn-icons-png.flaticon.com/512/8/8206.png' , 
    iconSize : [40,40], 
    iconAnchor: [17, 46], 
    popupAnchor: [0, -46],
  })

function RoutingMaching ({userPosition ,locations}){
    // const [target , setTarget] = useState({})
    const map = useMap()
    const markerClicked = (target)=>{
        
        L.Routing.control({
            
            waypoints : [
                L.latLng(userPosition[0] , userPosition[1]),
                L.latLng(target?.lat, target?.lng)
            ],
            plan :L.Routing.plan( [
                L.latLng(userPosition[0] , userPosition[1]),
                L.latLng(target?.lat, target?.lng)
            ],
            
             {
                createMarker :function (i , wp , n){
                    if (i == n - 1) {
                        return L.marker(wp.latlng, {
                          draggable: false , 
                        //   icon : myMarker ,
                          icon : this.draggableWaypoints
                          
                         
                        });
                      } 
                } ,
                draggableWaypoints : true

                
            }
            ) ,
            
            lineOptions : {
                
                styles : [
                    {
                        color :"purple"  , weight : 3
                        
                    }
                ] , 
                
                
            } ,
            
            routeWhileDragging : false ,
            addWaypoints : false ,
            fitSelectedRoutes :false ,
            showAlternatives : false,
            
            
            

        }).addTo(map)
    }
   useEffect(()=>{
    
      locations.map((loc)=>{
        L.marker(loc , { icon: myMarker  }).on('click' , (e)=>{
            // console.log(e.latlng)
            markerClicked(e.latlng)
        }).addTo(map)

      })
    //   const arr = []
    //   map.on('click' , (e)=>{
    //     arr.push([e.latlng.lat , e.latlng.lng])
    //     console.log(JSON.stringify(arr))
    //   })
   },[])


//    useEffect(()=>{

    
    
//    },[])
   
   
   
    return null
}

export default RoutingMaching
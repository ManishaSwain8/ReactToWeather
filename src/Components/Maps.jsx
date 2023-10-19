import React ,{ useEffect, useState, useRef }from "react";
//Map
import {Marker , Popup, TileLayer ,MapContainer, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "../Map/constants";

export default function Maps(){
    const formD = useRef({
        latitude:null,
        longitude:null,
      })
    function LocationMarker() {
        const [position, setPosition] = useState(null);  
        const [bbox, setBbox] = useState([]);
        const markerRef = useRef(null)
        const map = useMap();
    
    
        useEffect(() => {
          map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            setBbox(e.bounds.toBBoxString().split(","));
            formD.current.latitude = e.latlng.lat;
            formD.current.longitude = e.latlng.lng;
          });
        }, [map]);
    
        return position === null ? null : (
          <Marker position={position} icon={icon} ref={markerRef} draggable={true} eventHandlers={{
            dragend() {
              const marker = markerRef.current
              if (marker != null) {
                setPosition(marker.getLatLng())
              }
              formD.current.latitude = marker.getLatLng().lat;
              formD.current.longitude = marker.getLatLng().lng;
            },
          }}>
            <Popup>
              You are here. <br />
              Map bbox: <br />
              <b>Southwest lng</b>: {bbox[0]} <br />
              <b>Southwest lat</b>: {bbox[1]} <br />
              <b>Northeast lng</b>: {bbox[2]} <br />
              <b>Northeast lat</b>: {bbox[3]}
            </Popup>
          </Marker>
        );
      }
    return(
        <>
        <div id='map' style={{height:"100%" ,width:"100%"}}>
        <MapContainer
          center={[28.7041, 77.1025]}
          zoom={18}
          scrollWheelZoom
          style={{ height: "70vh"}}
          >
          <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker/>
          </MapContainer>
          </div>        
        </>
    );
}
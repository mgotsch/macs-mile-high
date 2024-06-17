import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

export default function MyMap() {

  const [viewState, setViewState] = React.useState({
    longitude: -98.3509,
    latitude: 39.8283,
    zoom: 3.5,
    pitch: 0,
    bearing: 0,
  });
  
  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState).then(console.log(evt.viewState))}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      
    </Map>
  );
}
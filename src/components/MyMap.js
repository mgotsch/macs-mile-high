import  {useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerData from '../data/markers.json';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export default function MyMap() {
  
  const [markers, setMarkers] = useState([]);
  // Set bounds to Denver, Colorado.
  const bounds = [
    [-106, 39.5],
    [-104, 40]
  ];  
  
  useEffect(() => {
    // Directly set the imported JSON data
    console.log(markerData);
    setMarkers(markerData.features);
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      center: [-105, 39.75],
      zoom: 10.5,
      style: 'mapbox://styles/mgotsch/clxtlfu2r00o301rndnipcx45',
      maxBounds: bounds
    });

    markers.forEach(marker => {
      // console.log(marker);
      const locationType = marker.properties.location.loc_type.toLowerCase();
      const el = document.createElement('div');
      el.className = `marker marker-${locationType}`;
      // el.style.backgroundImage = `url(./icons/${locationType}.png)`;
     
      new mapboxgl.Marker(el)
        .setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])
        .setPopup(new mapboxgl.Popup().setHTML(
          `<div class="pop-up"><h3>${marker.properties.location.name}</h3><p>${marker.properties.location.address}</p></div>`
        ))
        .addTo(map);
    });

  }, [markers]);
  
  return (
    <div id="map"style={{width: "100vw", height: "100vh"}}></div>
  );
}
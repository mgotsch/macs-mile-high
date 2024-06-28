import  {useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerData from '../data/markers.json';
import KeyItem from './KeyItem';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
const locationTypes = ['Bar', 'Park', 'Restaurant', 'Activity', 'Coffeeshop', 'Breakfast', 'Store', 'Brewery', 'Sweets'];

export default function MyMap() {
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState({
    Bar: true,
    Park: true,
    Restaurant: true,
    Activity: true,
    Coffeeshop: true,
    Breakfast: true,
    Store: true,
    Brewery: true,
    Sweets: true,
  });

  const [selectAll, setSelectAll] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

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
      center: [-105, 39.70],
      zoom: 11,
      style: 'mapbox://styles/mgotsch/clxtlfu2r00o301rndnipcx45',
      maxBounds: bounds
    });

    markers.forEach(marker => {
      // console.log(marker);
      const locationType = marker.properties.location.loc_type;
      if (filter[locationType]) {
        const el = document.createElement('div');
        el.className = `marker marker-${locationType.toLowerCase()}`;
        // el.style.backgroundImage = `url(./icons/${locationType}.png)`;
      
        new mapboxgl.Marker(el)
          .setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])
          .setPopup(new mapboxgl.Popup().setHTML(
            `<div class="pop-up"><h3>${marker.properties.location.name}</h3><p>${marker.properties.location.address}</p></div>`
          ))
          .addTo(map);
      }
    });

  }, [markers, filter]);
  
  const handleCheckboxChange = (type) => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSelectAllChange = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    const newFilter = {};
    locationTypes.forEach((type) => {
      newFilter[type] = newValue;
    });
    setFilter(newFilter);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
    <div id="map"style={{width: "100vw", height: "100vh"}}></div>
    <div className={`key-box ${isMinimized ? 'minimized' : ''}`}>
        <div className="key-box-header">
          <span>Location Filters</span>
          <button onClick={toggleMinimize}>{isMinimized ? '[+]' : '[-]'}</button>
        </div>
        {!isMinimized && (
          <div className="key-box-content">
            <KeyItem
              key="All"
              label="All"
              value={selectAll}
              onChange={handleSelectAllChange}
            />
            {locationTypes.map((type) => (
              <KeyItem
                key={type}
                label={type}
                value={filter[type]}
                onChange={() => handleCheckboxChange(type)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
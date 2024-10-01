import  {useState, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerData from '../data/markers.json';
import KeyItem from './KeyItem';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
const locationTypes = ['Bar', 'Park', 'Restaurant', 'Activity', 'Coffeeshop', 'Breakfast', 'Shop', 'Brewery', 'Sweets'];

export default function MyMap() {
  const [filter, setFilter] = useState({
    Bar: true,
    Park: true,
    Restaurant: true,
    Activity: true,
    Coffeeshop: true,
    Breakfast: true,
    Shop: true,
    Brewery: true,
    Sweets: true,
  });

  const [selectAll, setSelectAll] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
     // Set bounds to Denver, Colorado.
    const bounds = [
      [-106, 39.5],
      [-104, 40]
    ];  

    const map = new mapboxgl.Map({
      container: 'map',
      center: [-104.982, 39.725],
      zoom: 12,
      style: 'mapbox://styles/mgotsch/clxtlfu2r00o301rndnipcx45',
      maxBounds: bounds
    });

    markerData.features.forEach(marker => {
      // console.log(marker);
      const locationType = marker.properties.location.loc_type;
      if (filter[locationType]) {
        const el = document.createElement('div');
        el.className = `marker marker-${locationType.toLowerCase()}`;
        // el.style.backgroundImage = `url(./icons/${locationType}.png)`;
      
        new mapboxgl.Marker(el)
          .setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])
          .setPopup(new mapboxgl.Popup({ className: "pop-up" }).setHTML(
            `<div>
              <h3>${marker.properties.location.name}</h3>
              <div class="location-line">
                <img src="/icons/locationIcon.png" alt="Location Icon" width="20px" height="20px">
                <p>${marker.properties.location.address.split(',')[0]}</p>
              </div>
              <img src=${marker.properties.photo_url} alt="${marker.properties.location.name} Photo" width="200" height="150" class="location-pic">
              <p>${marker.properties.editorial_summary?.overview || "Coming Soon"}</p>
            </div>`
          ))
          .addTo(map);
      }
    });

  }, [filter]);
  
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
        <button onClick={toggleMinimize} className= 'arrow-box'><img src={isMinimized ? '/icons/arrowUp.png' : '/icons/arrowDown.png'} alt='Arrow' style={{width:"25px"}}></img></button>
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
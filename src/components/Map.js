import React, { Component } from 'react';
import ReactMapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = process.env.MAPBOX_API_KEY;

class Map extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        latitude: 40.78343,
        longitude: -73.96625,
        zoom: 11
      }
    }
    this.handleViewportChange = this.handleViewportChange.bind(this)
  }
  handleViewportChange(viewport) {
    this.setState(prevState => ({
      viewport: {...prevState.viewport, ...viewport}
    }))
  }
  render() {
    return (
      <ReactMapGl
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v10"
      />
    )
  }
}

export default Map;
import React, { Component } from 'react';

class LocationLogger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: null,
    };
  }

  handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ userLocation: `Latitude: ${latitude}, Longitude: ${longitude}` });
        console.log(`User Location: Latitude ${latitude}, Longitude ${longitude}`);
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Get User Location</button>
        {this.state.userLocation && <p>{this.state.userLocation}</p>}
      </div>
    );
  }
}

export default LocationLogger;

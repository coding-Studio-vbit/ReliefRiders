import React from 'react'
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 17.4399,
  lng: 78.4983
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCaPLNbRCefscwpgU_4kxV1PqjLwWFi-vI"
  })

  const [map, setMap] = React.useState();

 const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(map)
    console.log(map);
  }, [])

  return isLoaded ? (
      
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={10}
    onLoad={onLoad}
    onUnmount={onUnmount}
  >
    <></>
  </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent);
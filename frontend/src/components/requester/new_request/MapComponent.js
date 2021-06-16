import React from 'react'
import { GoogleMap, useJsApiLoader ,Marker} from '@react-google-maps/api';

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
    googleMapsApiKey: "AIzaSyCeEkkE0sTIWmxXAjmLlp2Y8kkzlZ-gJ3c"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      
     <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={map => {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
          }}
        onUnmount={onUnmount}
      >
        { map.isLoaded && 
            <Marker 
            position={{ lat: 17.4399, lng: 78.4983 }} 
            />}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)
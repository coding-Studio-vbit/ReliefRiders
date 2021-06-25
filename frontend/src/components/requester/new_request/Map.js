import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Spinner } from "../../global_ui/spinner";
import styles from './Map.module.css'
import Navbar from '../../global_ui/nav';
import SearchAddress from './InputAddress';

function Map() {
    const [latitude, setLatitude] = useState(41.390205);
    const [longitude, setLongitude] = useState(2.154007);

    const containerStyle = {
        minWidth: '350px',
        maxWidth: '450px',
        minHeight: '55vh',
        margin: '10px'
    };

    const center = {
        lat: latitude,
        lng: longitude,
    };


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: '{process.env.REACT_APP_GOOGLE_KEY}'
    })

    const [gmap, setGmap] = React.useState(null)

    const onLoad = React.useCallback(function callback(gmap) {
        const bounds = new window.google.maps.LatLngBounds();
        gmap.fitBounds(bounds);
        setGmap(gmap)
    }, [])

    const onUnmount = React.useCallback(() => {
        setGmap(null)
    }, [])


    function report(state) {
        console.log('Location Permission =>' + state);
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state == 'granted') {
                    report(result.state);
                    navigator.geolocation.getCurrentPosition(showPosition);
                    console.log(latitude, latitude);
                } else if (result.state == 'prompt') {
                    report(result.state);
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else if (result.state == 'denied') {
                    report(result.state);
                    //
                }
                result.onchange = function () {
                    report(result.state);
                }
            });

        } else {
            console.log("Location Services not supported");
        }
    }

    function showPosition(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude);
    }
    return isLoaded ? (
        <div style={{ height: '100%' }} >
            <Navbar title='Choose Location' style={{ background: 'green', color: 'white' }} />

            <p style={{ margin: 0.8 + 'em' }}></p>

            <section className={styles.chooseLocation}>

                <button style={{ marginTop: '10px' }} onClick={() => getLocation()}>
                    Fetch Current Location
                </button>

                <div className={styles.googleMap}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >

                    </GoogleMap>
                </div>

                <SearchAddress placeholder="Search Address" />

                <p style={{ margin: 0.6 + 'em' }}></p>


                <button style={{ padding: '10px 7px', marginTop: '10px' }}>
                    Pin Address
                </button>

            </section>


        </div>

    ) : (<Spinner radius="3" />)
}

export default Map;


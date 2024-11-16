// @ts-nocheck
"use client"
// pages/pigeon-map.js
import { Map, Marker } from 'pigeon-maps';

export default function Maps() {
    const latitude = 35.6892;
    const longitude = 51.3890;
    const coordinates = [latitude, longitude];  

    const handleOpenAndroidMaps = () => {
        const url = `intent://maps.google.com/maps?daddr=${latitude},${longitude}#Intent;scheme=https;package=com.google.android.apps.maps;end`;
        window.open(url, '_blank');
    };

    return (
        <div style={{ width: '500px', height: '500px' }} onClick={handleOpenAndroidMaps}>
            <Map height={500} defaultCenter={coordinates} defaultZoom={15}>
                <Marker anchor={coordinates} />
            </Map>
        </div>
    );
}

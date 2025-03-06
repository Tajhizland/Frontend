// @ts-nocheck
"use client"
// pages/pigeon-map.js
import {Map, Marker} from 'pigeon-maps';

export default function Maps() {
    const latitude = 35.69589116711923;
    const longitude = 51.397654536591794;
    const coordinates = [latitude, longitude];

    const handleOpenAndroidMaps = () => {
        const url = `intent://maps.google.com/maps?daddr=${latitude},${longitude}#Intent;scheme=https;package=com.google.android.apps.maps;end`;
        window.open(url, '_blank');
    };

    return (
        <div className={"aspect-1 h-0 w-full"} onClick={handleOpenAndroidMaps}>
            <Map height={500} defaultCenter={coordinates} defaultZoom={15}>
                <Marker anchor={coordinates}/>
            </Map>
        </div>
    );
}

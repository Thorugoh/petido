import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from "react";


function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState("");

    async function getCurrentPosition() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        return location;
    }

    return {
        getCurrentPosition,
        location,
        errorMsg
    }
}

export { useLocation };
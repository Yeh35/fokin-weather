import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from "./Loading";
import * as Location from "expo-location";
import {Alert} from "react-native"
import axios from "axios";

const API_KEY = "4b20fe0c8079b33e15a8dacc276841b9";

export default class extends React.Component {
    state = {
        isLoading: true,
        latitude: 0, 
        longitude: 0
    };

    getWeather = async(latitude, longitude) => {
        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        console.log(data);
    };

    getLocation = async() => {
        try {
            const respoawait = await Location.requestPermissionsAsync();
            console.log(respoawait);

            const {
                coords: {latitude, longitude}
            } = await Location.getCurrentPositionAsync();
            
            this.getWeather(latitude, longitude);

            this.setState({ 
                isLoading: false,
                latitude: latitude, 
                longitude: longitude
            });

        } catch (error) {
            Alert.alert("Can't find you", "So sad");
        }
    };

    componentDidMount() {
        this.getLocation();
    };

    render() {
        const { isLoading } = this.state;
        return isLoading ? <Loading /> : null; 
    };
}


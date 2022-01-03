import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
import FutureForecast from './FutureForecast'

const WeatherScroll = ({weatherData, current}) => {
    return (
        <ScrollView horizontal={true} style={styles.scrollView}>
            <CurrentTempEl data={weatherData && weatherData.length > 0 ? weatherData[0] : {}} current = {current}/>
            <FutureForecast data={weatherData} current = {current}/>
        </ScrollView>
    )
}


const CurrentTempEl = ({data, current}) => {

    if(data && data.weather){
        const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View style={styles.currentTempContainer}>
                <Image source={img} style={styles.image} />
                <View  style={styles.otherContainer}>
                    <Text  style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Text  style={styles.temp}>Current: {Math.round(current? current.temp : "")}°C</Text>
                    <Text  style={styles.temp}>Min: {Math.round(data.temp.min)}°C</Text>
                    <Text  style={styles.temp}>Max: {Math.round(data.temp.max)}°C</Text>
                    <Text  style={styles.temp}>Wind Speed: {Math.round(data.wind_speed)} m/s</Text>
                    <Text  style={styles.temp}>Precipitation: {data.pop} %</Text>
                    <Text  style={styles.temp}>Humidity: {(data.humidity)} %</Text>
                    <Text  style={styles.temp}>Description: {(data.weather[0].description)}</Text>
                    
                </View>
            </View>
        )
    }else{
        return( 
            <View>

            </View>

        )
        
    }
   
}

const styles = StyleSheet.create({
    scrollView: {
        flex:0.4,
        backgroundColor: '#18181bcc',
        padding:10
    },
    image: {
        width: 150,
        height: 150
    },
    currentTempContainer: {
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'white',
        borderWidth:1,
        padding: 15
    },
    day: {
        fontSize: 20,
        color:"white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },
    temp: {
        fontSize: 16,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
    otherContainer: {
        paddingRight: 40
    }
})

export default WeatherScroll
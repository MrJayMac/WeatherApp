import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
const NextDays = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
                data && data.length > 0 ?
                    
                data.map((data, idx) => (
                    idx !== 0 &&  <FutureForecastItem key={idx} forecastItem={data}/>
                ))
                        
                :

                <View/>
            }
            
          
            

        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
    return (
        <View  style={styles.futureForecastItemContainer}>
            <Text  style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.image} />
            <Text  style={styles.temp}>Current: {Math.round(forecastItem.temp.day)}°C</Text>
            <Text  style={styles.temp}>Min: {Math.round(forecastItem.temp.min)}°C</Text>
            <Text  style={styles.temp}>Max: {Math.round(forecastItem.temp.max)}°C</Text>
            <Text  style={styles.temp}>Wind Speed: {Math.round(forecastItem.wind_speed)} m/s</Text>
            <Text  style={styles.temp}>Humidity: {forecastItem.humidity} %</Text>
            <Text  style={styles.temp}>Description: {forecastItem.weather[0].description}</Text>


        </View>
    )
}

export default NextDays


const styles = StyleSheet.create({
    image: {
        width: 100,
        height:100
    }, 
    futureForecastItemContainer: {
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: '#00000033',
        borderRadius:10,
        borderColor:"#eee",
        borderWidth:1,
        padding: 15,
        marginLeft: 10
    }, 
    day: {
        fontSize: 15,
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
})
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import WeatherScroll from './components/WeatherScroll'


const API_KEY ='595b151a6ba8b59ac19d5356ee7e6a46';
const img = require('./assets/image.png')

const currentDate = new Date();
const date = currentDate.toDateString()


export default function App() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      let {latitude, longitude} = success.coords;
      fetchDataFromApi(latitude, longitude)
    }, (err) => {
      if(err){
        fetchDataFromApi("49.2827","-123.1207")
      }
    })
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Weather Application</Text>
          <Text style={styles.subheading}>{date}</Text>
        </View>
        <View style = {styles.searchBar}>
            <input 
              type="text"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </View>
        <WeatherScroll weatherData = {data.daily} current = {data.current}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: "#18181b99",
    textAlign:'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  }, 
  image:{
    flex: 1, 
    resizeMode:"cover", 
    justifyContent: "center"
  },
  searchBar:{
    flex: 1,
    marginTop:20,
    justifyContent:'center',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 10,
  },
  titleContainer: {
    backgroundColor: "#18181b99",
    textAlign:'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  },
  heading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    color:'white',
    fontWeight: '700'
  },
  subheading: {
    textAlign:'center',
    fontSize: 15,
    color:'white',
    fontWeight: '700'
  },
});

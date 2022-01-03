import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import WeatherScroll from './components/WeatherScroll'


const WEATHER_KEY ='595b151a6ba8b59ac19d5356ee7e6a46';
const ADDRESS_KEY = 'a7bbd84770de79b3d2f172e7c21bba4a';

const img = require('./assets/image.png')

const currentDate = new Date();
const date = currentDate.toDateString();

var LOCATION = ' '

 
export default function App() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState('');

  const search = evt => {
    fetch(`http://api.positionstack.com/v1/forward?access_key=${ADDRESS_KEY}&query=${query}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        console.log(result);
        var latitude = result.data[0].latitude;
        var longitude = result.data[0].longitude;
        fetchDataFromApi(latitude, longitude);
      });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search()
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
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${WEATHER_KEY}`).then(res => res.json()).then(data => {

      console.log(data)
      setData(data)
      LOCATION = data.timezone
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Weather Application</Text>
          <Text style={styles.subheading}>{date}</Text>
          <Text style={styles.subheading}>{LOCATION}</Text>
        </View>
        <View style = {styles.searchBar}>
            <input 
              type="text"
              placeholder="Enter location..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={handleKeyDown}
            />
            <View style = {styles.button}>
              <Pressable onPress={search}>
                <Text style = {styles.searchText}>Search</Text>
              </Pressable>
            </View>
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
    padding: 10,
    textAlign:'center'
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
    fontSize: 30,
    color:'white',
    fontWeight: '700'
  },
  subheading: {
    textAlign:'center',
    fontSize: 20,
    color:'white',
    fontWeight: '700'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#18181bcc',
    borderRadius: 10
  },
  searchText: {
    textAlign:'center',
    fontSize: 15,
    color:'white',
    fontWeight: '700'
  },
});

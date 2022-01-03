import React, { useState} from 'react'
import { StyleSheet, View, Text} from 'react-native';

const DateTime = ({timezone}) => {
    
    return (
        <View style={styles.container}>
            <View>
            </View>
            <View style={styles.location}>
                <Text style={styles.area}>{timezone? timezone : ""}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 15
    },
    location: {
        textAlign:'center',
        marginTop: 50
    },
    area: {
        fontSize: 20,
        color:'white'
    }
})

export default DateTime

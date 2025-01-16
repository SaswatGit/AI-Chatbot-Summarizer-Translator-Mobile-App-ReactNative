import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

import React from 'react'

import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <View style={styles.TextIconContainer}>
        <Image source={require('../icons/MIO.png')} style={styles.TextIcon} />
      </View>
        <Text style={styles.subText}>Chat, Summarize and Translate using AI</Text>
      <View style={styles.allbots}>
        <Text style={styles.allbotsText}>AI Bots</Text>
        <View style={styles.bots}>
            <TouchableOpacity style={styles.bot} onPress={() => navigation.navigate('Chat')}>
                <View style={styles.botIconText}>
                    <IoniconsIcon style={styles.botIcon} name="chatbox-ellipses-outline" size={24} color="black" />
                    <Text style={styles.botName}>Chatbot</Text>
                </View>
                <IoniconsIcon style={styles.botIcon} name="arrow-forward-circle" size={32} color="#065597" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bot} onPress={() => navigation.navigate('Summarize')}>
                <View style={styles.botIconText}>
                    <MaterialCommunityIconsIcon style={styles.botIcon} name="card-text-outline" size={24} color="black" />
                    <Text style={styles.botName}>Summarizer</Text>
                </View>
                <IoniconsIcon style={styles.botIcon} name="arrow-forward-circle" size={32} color="#065597" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bot} onPress={() => navigation.navigate('Translate')}>
                <View style={styles.botIconText}>
                    <MaterialCommunityIconsIcon style={styles.botIcon} name="translate" size={24} color="black" />
                    <Text style={styles.botName}>Translator</Text>
                </View>
                <IoniconsIcon style={styles.botIcon} name="arrow-forward-circle" size={32} color="#065597" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    TextIconContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    TextIcon: {
        width: 110,
        height: 42,
    },
    subText: {
        fontSize: 13,
        color: 'gray',
        marginTop: 30,
        fontWeight: 300,
    },
    allbots: {
        marginTop: 50,
        position: 'relative',
        width: '95%',
        borderRadius: 40,
    },
    allbotsText: {
        fontSize: 17,
        fontWeight: '600',
        color: 'black',
        padding: 10,
        textAlign: 'center',
    },
    bots: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    bot: {
        borderRadius: 50, 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        borderColor: 'gray',
        borderWidth: 0.5,
        height: 70,
        paddingHorizontal: 30,
        marginBottom: 10,
    },
    botIconText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    botIcon: {
        padding: 5
    },
    botName: {
        fontSize: 13,
        color: 'black',
    }
})
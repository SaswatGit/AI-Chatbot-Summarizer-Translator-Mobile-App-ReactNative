import { View, Text, StyleSheet, Linking } from 'react-native'
import React from 'react'

import FeatherIcon from 'react-native-vector-icons/Feather';


const ModelsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.modelCard}>
        <Text style={styles.modelUserdFor}>Bot: Chatbot</Text>
        <Text style={styles.modelName}>Model: LLAMA</Text>
        <Text style={styles.modelCreator}>By: META</Text>
        <Text style={styles.modelLink} onPress={() => Linking.openURL('https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct')}><FeatherIcon name="external-link" size={16} color="#065597" /> Read more</Text>
      </View>
      <View style={styles.modelCard}>
        <Text style={styles.modelUserdFor}>Bot: Summarizor</Text>
        <Text style={styles.modelName}>Model: BART</Text>
        <Text style={styles.modelCreator}>By: Facebook</Text>
        <Text style={styles.modelLink} onPress={() => Linking.openURL('https://huggingface.co/facebook/bart-large-cnn')}><FeatherIcon name="external-link" size={16} color="#065597" /> Read more</Text>
      </View>
      <View style={styles.modelCard}>
        <Text style={styles.modelUserdFor}>Bot: Translator</Text>
        <Text style={styles.modelName}>Model: MBART</Text>
        <Text style={styles.modelCreator}>By: Facebook</Text>
        <Text style={styles.modelLink} onPress={() => Linking.openURL('https://huggingface.co/facebook/mbart-large-50-many-to-many-mmt')}><FeatherIcon name="external-link" size={16} color="#065597" /> Read more</Text>
      </View>
    </View>
  )
}

export default ModelsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    modelCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 10,
    },
    modelUserdFor: {
        fontSize: 12,
        marginBottom: 5,
        color: 'gray',
    },
    modelName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modelCreator: {
        fontSize: 14,
        marginBottom: 5,
        color: 'gray',
    },
    modelLink: {
        fontSize: 16,
        color: '#065597',
    },
});
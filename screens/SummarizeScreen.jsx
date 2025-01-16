import React from 'react';
import {useState, useRef} from 'react'

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

import Clipboard from '@react-native-clipboard/clipboard';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { HfInference } from '@huggingface/inference';


// import {HF_TOKEN} from "@env"


export default function SummarizeScreen() {
  const copyToClipboard = (text) => {
      Clipboard.setString(text);
  };

  const scrollViewRef = useRef(null);

  const hf = new HfInference("access_token");

  const [input, setInput] = useState("");
  const [responding, setResponding] = useState(false);
  const [output, setOutput] = useState("");

  const generateResponse = async () => {
    try {
      if(input === "") {
        alert("Please enter a message");
        return;
      }else{
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      setResponding(true);
      
      const out = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs:input,
        parameters: {
          max_length: 100
        }
      })
      setOutput(out.summary_text);
      setInput("");
      scrollViewRef.current.scrollToEnd({ animated: true });
      setResponding(false);
    } catch (error) {
      alert("Something went wrong");
    }
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContainer}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.instr}>
          <Text style={styles.instrTitle}>AI Summarizer</Text>
          <Text style={styles.instrSubText}>Powered by BART</Text>
        </View>
        {
          output == "" ? "" : 
          <View style={styles.output}>
            <Text style={styles.actor}>AI</Text>
            <Text style={styles.outputText}>
            {output}
            </Text>
            <View style={styles.conversationBtns}>
                              <TouchableOpacity style={styles.conversationBtn} onPress={() => copyToClipboard(output)}>
                                <IoniconsIcon name="copy-outline" size={14} color="gray" />
                              </TouchableOpacity>
            </View>
          </View>
        }
          <View style={styles.respondingIndicator}>
                      <View>{responding == true ? <View>
                        <ActivityIndicator size="small" color="gray" />
                      </View> : ""}</View>
                    </View>
      </ScrollView>
      </View>
      <View style={styles.inputBox}>
        <TextInput placeholder='Write here...' placeholderTextColor={'gray'} style={styles.input} value={input} onChangeText={(text) => setInput(text)} />
        {
                    responding == true ? <View>
                    <ActivityIndicator size="small" color="gray" />
                  </View> : 
                  <TouchableOpacity style={styles.inputBtn} onPress={generateResponse}>
                    <FontAwesomeIcon name="send-o" size={20} color="black" />
                  </TouchableOpacity>
                  }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollViewContainer: {
    height: '90%',
  },
  scrollView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  instr: {
    marginVertical: 40,
  },
  instrTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instrSubText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 10,
    marginBottom: 20,
    fontWeight: 300,
  },
  inputBox: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 35,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  input: {
    flex: 1,
    height: '50',
    paddingHorizontal: 20,
    width: '80%'
  },
  inputBtn: {
    paddingHorizontal: 10
  },
  respondingIndicator: {
    width: "80%",
    marginHorizontal: "auto",
    marginVertical: 5,
    alignItems: 'left',
  },
  output: {
    width: '90%',
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  actor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  outputText: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%'
  },
  conversationBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  conversationBtn: {
    padding: 5,
  },
});
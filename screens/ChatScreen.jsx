import React from 'react';
import {useState, useRef} from 'react'

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


import { HfInference } from '@huggingface/inference';


// import {HF_TOKEN} from "@env"

export default function ChatScreen() {

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };


  const scrollViewRef = useRef(null);

  const hf = new HfInference("access_token");

  const [input, setInput] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [responding, setResponding] = React.useState(false);

  const generateResponse = async () => {
    try {
      if(input === "") {
        alert("Please enter a message");
        return;
      }else{
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      setResponding(true);
      const messages = [
        { role: "user", content: input },
        ...conversationHistory,
      ];
      setConversationHistory([...conversationHistory, { role: "user", content: input }]);
      const out = await hf.chatCompletion({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: messages,
        max_tokens: 512,
        temperature: 0.1,
      });
      setConversationHistory([...conversationHistory, { role: "user", content: input }, { role: "assistant", content: out.choices[0].message.content }]);
      setInput("");
      scrollViewRef.current.scrollToEnd({ animated: true });
      setResponding(false);
    } catch (error) {
      alert("Something went wrong");
    }
  }

  const takeInputFromQuestion = (input)=>{
    setInput(input);
    scrollViewRef.current.scrollToEnd({ animated: true });
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContainer}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.instr}>
          <Text style={styles.instrTitle}>AI ChatBot</Text>
          <Text style={styles.instrSubText}>Powered by LLAMA</Text>
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.questionInstr}>How can I help you?</Text>
          <TouchableOpacity style={styles.question} onPress={() => takeInputFromQuestion("Please provide your response within 200 words. Will AI take all human jobs?")}>
            <Text style={styles.questionText}>Will AI take all human jobs?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.question} onPress={() => takeInputFromQuestion("Please provide your response within 200 words. What came first, the chicken or the egg?")}>
            <Text style={styles.questionText}>What came first, the chicken or the egg?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.question} onPress={() => takeInputFromQuestion("Please provide your response within 200 words. Is it possible to travel back in time?")}>
            <Text style={styles.questionText}>Is it possible to travel back in time?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.question} onPress={() => takeInputFromQuestion("Please provide your response within 200 words. Is there other intelligent life in the universe?")}>
            <Text style={styles.questionText}>Is there other intelligent life in the universe?</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.conversationHistory}>
            {conversationHistory.map((message, index) => (
              <View key={index} style={styles.conversationHistoryItem}>
                <Text style={styles.conversationHistoryActor}>{message.role === "user" ? "You" : "AI"}</Text>
                <Text style={styles.conversationHistoryText}>{message.content}</Text>
                <View style={styles.conversationBtns}>
                  <TouchableOpacity style={styles.conversationBtn} onPress={() => copyToClipboard(message.content)}>
                    <IoniconsIcon name="copy-outline" size={14} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.respondingIndicator}>
            <View>{responding == true ? <View>
              <ActivityIndicator size="small" color="gray" />
            </View> : ""}</View>
          </View>
      </ScrollView>
      </View>
      <View style={styles.inputBox}>
        <TextInput placeholder='Type a message...' placeholderTextColor={'gray'} style={styles.input} value={input} onChangeText={(text) => setInput(text)} />
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
    marginBottom: 80,
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
  questionBox: {
    width: "90%",
    marginHorizontal: "auto",
    marginVertical: 15,
  },
  questionInstr: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  question: {
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 5,
  },
  questionText: {
    fontSize: 12,
    color: 'gray'
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
    width: "95%",
    marginHorizontal: "auto",
    marginVertical: 5,
    alignItems: 'flex-start'
  },
  conversationHistory: {
    width: "95%",
    marginHorizontal: "auto",
    marginVertical: 20,
  },
  conversationHistoryItem: {
    marginBottom: 5,
    overflow: 'hidden',
    textAlign: 'left',
  },
  conversationHistoryActor: {
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 5,
    color: "black",
  },
  conversationHistoryText: {
    fontSize: 15,
    color: "black",
    lineHeight: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white'
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

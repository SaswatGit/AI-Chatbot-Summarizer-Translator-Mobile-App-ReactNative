import React from 'react';
import {useState, useRef} from 'react'

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

import Clipboard from '@react-native-clipboard/clipboard';

import { SelectList } from 'react-native-dropdown-select-list'


import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { HfInference } from '@huggingface/inference';


// import {HF_TOKEN} from "@env"


export default function TranslateScreen() {
  const copyToClipboard = (text) => {
      Clipboard.setString(text);
  };

  const [fromSelected, setFromSelected] = useState("");
  const [toSelected, setToSelected] = useState("");

  const fromData = [
    {key:'en_XX', value:'English'},
    {key:'hi_IN', value:'Hindi'},
    {key:'fr_FR', value:'French'},
    {key:'ar_AR', value:'Arabic'},
    {key:'ja_XX', value: 'Japanese'},
]
  const toData = [
    {key:'en_XX', value:'English'},
    {key:'hi_IN', value:'Hindi'},
    {key:'fr_XX', value:'French'},
    {key:'ar_AR', value:'Arabic'},
    {key:'ja_XX', value: 'Japanese'},
]
  
  const scrollViewRef = useRef(null);

  const hf = new HfInference("access_token");

  const [input, setInput] = useState("");
  const [responding, setResponding] = React.useState(false);
  const [output, setOutput] = useState("");

  const generateResponse = async () => {
    try {
      if(fromSelected === "" || toSelected === "") {
        alert("You have not selected any language!");
        return;
      }
      if(input === "") {
        alert("You have not entered any text");
        return;
      }else{
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
      setResponding(true);
      
      const out = await hf.translation({
        model: 'facebook/mbart-large-50-many-to-many-mmt',
        inputs: input,
        parameters: {
        "src_lang": fromSelected,
        "tgt_lang": toSelected
       }
      })
      setOutput(out.translation_text);
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
          <Text style={styles.instrTitle}>AI Translator</Text>
          <Text style={styles.instrSubText}>Powered by MBART</Text>
        </View>
        <View style={styles.lanInputBox}>
            <Text style={styles.lanInputInstr}>Select Languages</Text>
            <View style={styles.lanInputs}>
            <SelectList 
            setSelected={(val) => setFromSelected(val)} 
            data={fromData} 
            save="key"
            placeholder='From'
            />
            <SelectList 
            setSelected={(val) => setToSelected(val)} 
            data={toData} 
            save="key"
            placeholder='To'
            />
            </View>
      </View>
      <View style={styles.inputBox}>
        <TextInput placeholder='Type your text here ...' placeholderTextColor={'gray'} style={styles.input} value={input} onChangeText={(text) => setInput(text)} />
        {
                    responding == true ? <View>
                    <ActivityIndicator size="small" color="gray" />
                  </View> : 
                  <TouchableOpacity style={styles.inputBtn} onPress={generateResponse}>
                    <FontAwesomeIcon name="send-o" size={20} color="black" />
                  </TouchableOpacity>
                  }
      </View>
        {
          output == "" ? "" : 
          <View style={styles.output}>
            <Text style={styles.actor}>You</Text>
            <Text style={styles.outputText}>
            {input}
            </Text>
            <View style={styles.conversationBtns}>
                              <TouchableOpacity style={styles.conversationBtn} onPress={() => copyToClipboard(input)}>
                                <IoniconsIcon name="copy-outline" size={14} color="gray" />
                              </TouchableOpacity>
                            </View>
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
    height: '100%',
    width: '95%',
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
  lanInputBox: {
    position: 'relative',
  },
  lanInputInstr: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '450',
  },
  lanInputs: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  inputBox: {
    position: 'relative',
    marginVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 35,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
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
  output: {
    width: '90%',
    marginHorizontal: 'auto',
    marginBottom: 20,
  },
  actor: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
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
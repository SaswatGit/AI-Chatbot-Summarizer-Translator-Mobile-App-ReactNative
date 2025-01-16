import { TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import SummarizeScreen from './screens/SummarizeScreen';
import ModelsScreen from './screens/ModelsScreen';

import OcticonsIcon from 'react-native-vector-icons/Octicons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

    
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TranslateScreen from './screens/TranslateScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true}}>


        <Stack.Screen name="Home" component={HomeScreen} options={({navigation})=>({
          title: null, headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f5f5'},
          headerLeft: () => (
            <Image
              source={require('./icons/Icon.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Models')}>
              <MaterialIconsIcon name="model-training" size={24} color="black" />
            </TouchableOpacity>
          ),
        })
        } />

        <Stack.Screen name="Chat" component={ChatScreen} options={({navigation})=>({
          title: null, headerBackVisible: true, headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f5f5'},
          headerLeft: () => (
            <Image
              source={require('./icons/Icon.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{padding: 10}} onPress={() => navigation.popToTop()}>
              <OcticonsIcon name="home" size={24} color="black" />
            </TouchableOpacity>
          ),
        })
        } />


        <Stack.Screen name="Summarize" component={SummarizeScreen} options={({navigation})=>({
          title: null, headerBackVisible: true, headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f5f5'},
          headerLeft: () => (
            <Image
              source={require('./icons/Icon.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{padding: 10}} onPress={() => navigation.popToTop()}>
              <OcticonsIcon name="home" size={24} color="black" />
            </TouchableOpacity>
          ),
        })
        } />


        <Stack.Screen name="Translate" component={TranslateScreen} options={({navigation})=>({
          title: null, headerBackVisible: true, headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f5f5'},
          headerLeft: () => (
            <Image
              source={require('./icons/Icon.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity style={{padding: 10}} onPress={() => navigation.popToTop()}>
              <OcticonsIcon name="home" size={24} color="black" />
            </TouchableOpacity>
          ),
        })
        } />


        <Stack.Screen name="Models" component={ModelsScreen} options={({navigation})=>({
          title: 'Models', headerShadowVisible: false, headerStyle: {backgroundColor: '#f5f5f5'},
          headerRight: () => (
            <TouchableOpacity style={{padding: 10}} onPress={() => navigation.popToTop()}>
              <OcticonsIcon name="home" size={24} color="black" />
            </TouchableOpacity>
          ),
        })
        } />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
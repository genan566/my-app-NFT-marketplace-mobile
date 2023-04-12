import 'react-native-gesture-handler';

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useLoadingFonts, } from './utilities/LoadingFonts';
import StartScreen from './src/screens/StartScreen';
import ClientTABS from './src/NAVIGATIONS/TABS/ClientTABS';
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
function HomeScreen() {

  const [type, setType] = React.useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Camera style={{ width: 200, height: 300 }} type={type}>
        <View style={{}}>
          <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: "red" }} onPress={toggleCameraType}>
            <Text style={{ color: "white" }}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function App() {

  return (
    <>
      <NavigationContainer>
        {/* <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={StartScreen} />
          <Stack.Screen name="Detail" component={DetailsScreen} />
        </Stack.Navigator> */}

        <ClientTABS />
        {/* <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Detail" component={DetailsScreen} />
      </Drawer.Navigator> */}
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  );
}

export default App;
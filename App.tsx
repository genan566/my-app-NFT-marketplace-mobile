import 'react-native-gesture-handler';

import * as React from 'react';
import { View, Text, TouchableOpacity, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useLoadingFonts, } from './utilities/LoadingFonts';
import StartScreen from './src/screens/StartScreen';
import ClientTABS, { HomeScreenssScreen } from './src/NAVIGATIONS/TABS/ClientTABS';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


LogBox.ignoreAllLogs();

import * as eva from '@eva-design/eva';
import { RootAdminEditableUserContextProvider, RootCreatorProvider, RootNFTContextProvider, RootUserContextProvider } from './src/contexts';

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

      {/* <Initializer> */}
      <RootAdminEditableUserContextProvider>
        <RootCreatorProvider>
          <RootUserContextProvider>
            <RootNFTContextProvider>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                  {/* <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={StartScreen} />
          <Stack.Screen name="Detail" component={DetailsScreen} />
        </Stack.Navigator> */}

                  {/* <ClientTABS /> */}
                  <HomeScreenssScreen />
                  {/* <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Detail" component={DetailsScreen} />
      </Drawer.Navigator> */}
                </NavigationContainer>

                <StatusBar style="auto" />
              </ApplicationProvider>
            </RootNFTContextProvider>
          </RootUserContextProvider>
        </RootCreatorProvider>
      </RootAdminEditableUserContextProvider>
      {/* </Initializer> */}
    </>
  );
}

export default App;
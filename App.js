import { useEffect, useRef, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

import { 
  Text, 
  View, 
  TouchableOpacity,
  Animated,
  Appearance,
} from 'react-native';

import LoadingScreen from './components/loadingScreen/LoadingScreen';
import Login from './components/login/Login';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Register from './components/register/Register';
import EditNote from './components/editNote/EditNote';
import ThemeModeButton from './components/iconButton/ThemeModeButton';

export default function App() {
  
  const devMode = {
  power: 'on',
    on: {
      timeToLoad: 3000,
      debugMenuEnabled: true,
      page: 2,
      pagefp: 2,
      appState: 'running',
      showDebugMenu: false,
    },
    off: {
      timeToLoad: 3000,
      debugMenuEnabled: false,
      page: 0,
      pagefp: 0,
      appState: 'initializing',
      showDebugMenu: false,
    },
  }
  
  const [mode, setMode] = useState(Appearance.getColorScheme())
  const [page, setPage] = useState(devMode[devMode.power].page);
  const opacityref = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
  const [showDebugMenu, setShowDebugMenu] = useState(devMode[devMode.power].showDebugMenu);
  const [appState, setAppState] = useState(devMode[devMode.power].appState);
  const [isInputFocus, setIsInputFocus] = useState(false);

  const [isHiddenMssg, setIsHiddenMssg] = useState(true);
  const [textMssg, setTestMssg] = useState('Login successful');
  const [colorMssg, setColorMssg] = useState(theme[mode].successColor);
  

  const consts = {
   px: 392.7/709,
   expo: 392.7/(709*2),
  };
  
  let styles = {
    
    container:
    {
      flex: 1,
      backgroundColor: backgroundColorInterpolation,      //backgroundColor: theme[mode].backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    opacity:
    {
      flex: 1,
      backgroundColor: theme[mode].backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: opacityref,
    },
    simpleButtons:{
      borderRadius: 10, 
      backgroundColor: '#ddd',
      width: 'min-content',
      marginHorizontal: 5,
    },
    icons: {
      small: {
        color: theme[mode].icons,
        px: 38,
        top: 3,
        left: 3,
      }
    }
  };
  
  const dataInput = {
    mode: mode,
    theme: theme,
    styles: styles,
    consts: consts,
    isInputFocus: isInputFocus,
    setIsInputFocus: setIsInputFocus,
  }
  
  const dataMssg = {
    isHiddenMssg: isHiddenMssg,
    setIsHiddenMssg: setIsHiddenMssg,
    textMssg: textMssg,
    setTestMssg: setTestMssg,
    colorMssg: colorMssg,
    setColorMssg: setColorMssg,
  }

  const dataButtonBack = {
    theme: theme,
    mode: mode,
    consts: consts,
    setIsInputFocus: setIsInputFocus,
    isInputFocus: isInputFocus,
    onPress: () => {
      setIsInputFocus(false)
    },
  }

  const dataPinInput = {
    theme: theme,
    mode: mode,
    consts: consts,
    styles: styles,
    dataInput: dataInput,
    isPinInput: false,
  }

  const dataIconButton = {
    theme: theme,
    mode: mode,
    setMode: setMode,
    consts: consts,
    styles: styles,
  }

  const dataMessage = {
    theme: theme,
    mode: mode,
    consts: consts,
  }

  const dataPages = {
    theme: theme,
    mode: mode,
    consts: consts,
    isInputFocus: isInputFocus,
    setIsInputFocus: setIsInputFocus,
    devMode: devMode,
    styles: styles,
    showDebugMenu: showDebugMenu,
    setShowDebugMenu: setShowDebugMenu,
    page: page,
    setPage: setPage,

    dataInput: dataInput,
    dataMssg: dataMssg,
    dataButtonBack: dataButtonBack,
    dataPinInput: dataPinInput,
    dataIconButton: dataIconButton,
    dataMessage: dataMessage,
  }
  
  //DO NOT CHANGE THE ORDER
  const debug = [
/* 00 */  <LoadingScreen dataPages={dataPages} />,
/* 01 */  <Login dataPages={dataPages} />,
/* 02 */  <ForgotPassword dataPages={dataPages} />,
/* 03 */  <Register dataPages={dataPages} />,
/* 04 */  <EditNote dataPages={dataPages} />,
  ]
  
  NavigationBar.setBackgroundColorAsync(theme[mode].backgroundColor);


  useEffect(() => {
    Animated.timing(opacityref, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(bgColor, {
      toValue: mode === 'dark' ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [mode]);

  const backgroundColorInterpolation = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.light.backgroundColor, theme.dark.backgroundColor],
  });

  useEffect(() => {
    if(appState === 'initializing'){
      setTimeout(() => {
        setPage(1);
        setAppState('running');
      }, devMode[devMode.power].timeToLoad);
    }
  }, [devMode]);

  useEffect(() => {
    switch(page){
      case 1:
        setIsHiddenMssg(true);
        setIsInputFocus(false);
        break;
      case 2:
        setIsHiddenMssg(true);
        break;
      case 3:
        setIsHiddenMssg(true);
        break;
    }
  }, [page]);

  return (
      <Animated.View 
        key={'uniqueKey'}
        style={ styles.opacity } 
      >
        { debug[page] }
        
        {showDebugMenu &&
          <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20 }} >
            <TouchableOpacity 
              onPress={() => setPage(page > 0 ? page-1 : debug.length-1)}
              style={{ ...styles.simpleButtons, justifyContent: 'center', alignItems: 'center', height: 30, paddingVertical: 2, paddingHorizontal: 6 }}
            >
              <Text> {"<"} </Text>
            </TouchableOpacity>
            
            <ThemeModeButton dataIconButton={dataIconButton} />

            <TouchableOpacity
              onPress={() => setPage(page < debug.length-1 ? page+1 : 0)}
              style={{ ...styles.simpleButtons, justifyContent: 'center', alignItems: 'center', height: 30, paddingVertical: 2, paddingHorizontal: 6 }}
            >
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>}
        
      </Animated.View>
  );
}

const theme = {
  dark: {
    backgroundColor: '#0E5758',
    noBackgroundColor: '#23DBDC',
    color: '#ffffff',
    noColor: '#000000',
    statusBar: 'light',
    shadowTitle: '#000000',
    icons: "#eeeeee",
    noMode: 'light',
    errorColor: '#B81414',
    successColor: '#30CC00',
    highSafety: '#30CC00',
    mediumSafety: '#C8AE04',
    lowSafety: '#FF0000',
  },
  light: {
    backgroundColor: '#23DBDC',
    noBackgroundColor: '#0E5758',
    color: '#000000',
    noColor: '#ffffff',
    statusBar: 'dark',
    shadowTitle: '#777777',
    icons: "#444444",
    noMode: 'dark',
    errorColor: '#A11212',
    successColor: '#124D00',
    highSafety: '#124D00',
    mediumSafety: '#7D6D02',
    lowSafety: '#760D0D',
  },
}

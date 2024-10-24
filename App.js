import { useEffect, useRef, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

import { 
  Text, 
  View, 
  TouchableOpacity, 
  Pressable,
  Animated,
  Appearance,
} from 'react-native';

import LoadingScreen from './components/loadingScreen/LoadingScreen';
import ThemeModeButton from './components/themeModeButton/ThemeModeButton';
import Login from './components/login/Login';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Component1 from './components/test/Test';

export default function App() {
  
  const devMode = {
  power: 'on',
    on: {
      timeToLoad: 1,
      debugMenuEnabled: true,
      page: 3,
      pagefp: 1,
      appState: 'running',
    },
    off: {
      timeToLoad: 3000,
      debugMenuEnabled: false,
      page: 0,
      pagefp: 0,
      appState: 'initializing',
    }
    
  }
  
  const [mode, setMode] = useState(Appearance.getColorScheme())
  const [page, setPage] = useState(devMode[devMode.power].page);
  const opacityref = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [appState, setAppState] = useState(devMode[devMode.power].appState);
  const [showBack, setShowBack] = useState(false);
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
    showBack: showBack,
    setShowBack: setShowBack,
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
    showBack: showBack,
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
  }

  const dataPages = {
    theme: theme,
    mode: mode,
    consts: consts,
    setIsInputFocus: setIsInputFocus,
    showBack: showBack,
    setShowBack: setShowBack,
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
  }
  
  const debug = [
    <LoadingScreen dataPages={dataPages} />,
    <Login dataPages={dataPages} />,
    <ForgotPassword dataPages={dataPages} />,
    <Component1 />,
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
      case 2:
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
            
            <ThemeModeButton mode={mode} setMode={setMode} styles={styles} theme={theme} />

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
    errorColor: '#760D0D',
    successColor: '#124D00',
  },
}

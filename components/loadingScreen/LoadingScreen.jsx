import { View, StatusBar, Text, Image, TouchableHighlight } from 'react-native';
import Logo from '../logo/Logo';


const LoadingScreen = ({ dataPages }) => {

  const { mode, consts, styles, theme, showDebugMenu, setShowDebugMenu, devMode } = dataPages;
  const logoSize = 216*consts.px;

  return (
    <View style={ styles.container }>
      <StatusBar style={ theme[mode].statusBar } />
      
      <TouchableHighlight
          underlayColor={theme[mode].backgroundColor}
          onPress={() => devMode[devMode.power].debugMenuEnabled ? setShowDebugMenu(!showDebugMenu) : null}
        >
          <Logo mode={mode} logoSize={logoSize} />
      </TouchableHighlight>
      
      <Text 
        style={ { 
          fontSize: 100*consts.px,
          fontWeight: 'bold', 
          color: theme[mode].color, 
          paddingTop: 20*consts.px, 
          textShadowColor: theme[mode].shadowTitle,
          textShadowOffset: {width: -3, height: 3},
          textShadowRadius: 8 } 
        } >
          SnapNote
      </Text>
    </View>
  );
}

export default LoadingScreen;
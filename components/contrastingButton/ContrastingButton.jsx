import { Text, TouchableOpacity, View } from "react-native";


const ContrastingButton = ({ text, theme, mode, consts, styles, onPress })=>{
  
  return (
    <View>
      <TouchableOpacity 
        style={{
          position: 'fixed',
          borderRadius: 50 * consts.px,
          width: 300 * consts.px,
          height: 100 * consts.px,
          backgroundColor: theme[mode].icons,
          justifyContent: 'center',
          alignItems: 'center',
          ...styles,
        }} 
        onPress={ onPress }
        >
        <Text 
          style={{ 
            color: theme[mode].noColor, 
            fontWeight: 'bold', 
            fontSize: 35*consts.px,
            textShadowColor: theme[mode].noColor,
            textShadowOffset: {width: 1, height: 0},
            textShadowRadius: 1,
           }} >{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ContrastingButton;
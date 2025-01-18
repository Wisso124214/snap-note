import { TouchableOpacity, Text } from "react-native";

const ContrastingSmallButton = ({ data, style, text, buttonprops }) => {
  
  const { theme, mode, consts } = data;
  
  return(
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 525*consts.px,
        alignSelf: 'center',
        backgroundColor: theme[mode].icons,
        borderRadius: 30*consts.px,
        width: 380*consts.px,
        height: 80*consts.px,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}

      {...buttonprops}
    >
      <Text
        style={{
          color: theme[mode].noColor,
          fontSize: 28*consts.px,
          fontWeight: 'bold',
        }}
      >{text}</Text>
    </TouchableOpacity>
  )
}

export default ContrastingSmallButton;
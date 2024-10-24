import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Message = (props) => {
  
  const { theme, mode, consts, text, bgcolor, style, hidden, viewprops } = props;

  const newText = text.split(' ').filter((el) => el !== '').join(' ');
  const lineNumbers = Math.floor(newText.length / 27) + 1;
  const radius = lineNumbers * (-3/20) + 1.15;
  
  return (
    <View {...viewprops} >
      {
        !hidden ? 
        <TouchableOpacity
          style={{
            position: 'absolute',
            //top: 525 * consts.px,
            top: -775 * consts.px,
            left: -(450/2) * consts.px,
            width: 450 * consts.px,
            height: (10 + (52 * lineNumbers)) * consts.px,
            backgroundColor: bgcolor,
            borderRadius: 31 * consts.px * lineNumbers * radius,
            justifyContent: 'center',
            alignItems: 'center',
            ...style,
          }} 
          
        >
          <View 
            >
              <Text
                style={{
                  color: theme[mode].noColor,
                  textAlign: 'center',
                  fontSize: 30 * consts.px,
                  fontWeight: 'bold',
                  width: 360 * consts.px,
                }} >
                  {newText}
              </Text>
          </View> 
        </TouchableOpacity>
        : null
      }

        
        
    </View>
  );
};

export default Message;
import React, { forwardRef, useEffect, useRef } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import SvgIconProvider from '../svg/svgIconProvider.jsx';

const Input = (props) => {
  const textInputRef = useRef(null);
  
  const { styles, theme, mode, onChangeText, consts, isInputFocus, setIsInputFocus, styleinput, viewprops, textprops, pinSelected, index, isKeyboardVisible, isPinInput, isRegisterInput, nInputSelected, isLoginInput } = props.dataInput;
  const [value, setValue] = props.dataInput.stateValue || React.useState('')
  
  const left = props.centered !== undefined ? 0 : 40 * consts.expo;

  const compStyles = {
    container: {
      left: left,
    },
    input: {
      color: theme[mode].color,
      borderColor: theme[mode].icons,
      fontSize: 32 * consts.px,
      borderWidth: 5 * consts.px,
      borderRadius: 50 * consts.px,
      paddingHorizontal: 50 * consts.px,
      width: 415 * consts.px,
      height: 80 * consts.px,
      ...styleinput,
    },
    icons: {
      color: theme[mode].icons,
      px: 60 * consts.px,
      top: 10 * consts.expo,
      left: -80 * consts.expo,
    }
  };
  
  useEffect(() => {
    if (props.secretWriting === true && !isLoginInput) {
      let newValue = ''
      if (value !== undefined) {
        newValue = value.split('').map((el, i) => {
          if (i < value.length)
            return '●'
          else
            return el
        }).join('')
      }
      setValue(newValue)
    }
  }, [value])

  useEffect(() => {

    if (isInputFocus === false && textInputRef.current && !isKeyboardVisible) {
      textInputRef.current.blur();
    }

    if(isPinInput){
      if (isInputFocus === true && index === pinSelected && textInputRef.current && !textInputRef.current.isFocused() && isPinInput) {
        textInputRef.current.focus();
      }
    }else if (isRegisterInput) {
      if (isInputFocus === true && index === nInputSelected && textInputRef.current && isRegisterInput) {
        textInputRef.current.focus();
      }
    }
  }, [isInputFocus, nInputSelected, pinSelected, isPinInput, isRegisterInput])

  return (
    <View {...viewprops} style={props.style}>
      <SafeAreaView>
        
        <View style={compStyles.container}>
          <SvgIconProvider
            src='styles.icons'
            strprops='color, px, top, left'
            d={props.dCodeIcon}
            styles={compStyles}
          />
          <TextInput
            ref={textInputRef}
            style={compStyles.input}
            value={isLoginInput ? value[index] : value}
            placeholder={props.placeholder}
            cursorColor={theme[mode].color}
            selectionColor={theme[mode].noMode}
            inputMode={props.inputMode}
            keyboardAppearance={mode}
            placeholderTextColor={theme[mode].icons + 'cc'}
            autoCorrect={!props.secretWriting}
            autoComplete='off'

            onFocus={() => {
              setIsInputFocus(true)
            }}
            onChangeText={(text) => {
              !isLoginInput ? setValue(text) : null
            }}
            
            {...textprops}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Input;
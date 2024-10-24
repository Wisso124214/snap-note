import React, { forwardRef, useEffect, useRef } from 'react';
import Input from '../input/Input';

const PinInput = forwardRef(({ index, dataPinInput, nextRef }, ref) => {

  const [value, setValue] = React.useState('');
  const { mode, theme, consts, styles, dataInput, pinSelected, setPinSelected } = dataPinInput;
  const { setShowBack, setIsInputFocus } = dataInput;
  
  /*useEffect(() => {  
    if (pinSelected !== index && textInputRef.current) {
      //textInputRef.current[index].blur();

    } else if (pinSelected === index && textInputRef.current) {
      //textInputRef.current[index].focus();
    }
  }, [pinSelected])*/

  /*useEffect(()=>{
    alert(JSON.stringify(textInputRef.current, null, 2))
  }, [textInputRef.current[index]])*/

  return(
    <Input 
      ref={ref}
      centered
      placeholder="X"
      inputMode="numeric"
      style={{ marginBottom: 150*consts.px }}
      mode={mode}
      theme={theme}
      consts={consts}
      styles={styles}
      dataInput={{ 
        ...dataInput,
        styleinput: {
          width: 100*consts.px,
          height: 100*consts.px,
          paddingRight: 20*consts.px,
          paddingLeft: 38*consts.px,
          fontSize: 50*consts.px,
          borderWidth: 6*consts.px,
          marginHorizontal: 10*consts.px,
        },
        stateValue: [value, setValue],
        textprops: {
          onFocus: ()=>{
            setPinSelected(index);
            setShowBack(true)
            setIsInputFocus(true)
          },
          maxLength: 1,
          onChangeText: (text)=>{
            
            setValue(text)
            if (text.length > 0 && index < 4) {
              setIsInputFocus(false)
              //nextRef.focus();
            }
          },
          onBlur: ()=>{
            setIsInputFocus(false)
            setShowBack(false)
          },
        }
      }}
    />
  )
});

export default PinInput;
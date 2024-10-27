import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from "react-native-svg"
import Input from '../input/Input';
import ContrastingButton from '../contrastingButton/ContrastingButton';
import ButtonBack from '../buttonBack/ButtonBack';


const ForgotPass3 = ({ dataForgotPassword }) => {
  const { dataPages, compStyles, setPagefp, pagefp } = dataForgotPassword;
  const { styles, mode, theme, consts, dataInput, showDebugMenu, setShowDebugMenu, dataButtonBack, isInputFocus, setIsInputFocus, setPage } = dataPages;
  const { devMode, dataMssg, dataMessage } = dataPages;

  const newDataMessage = {
    ...dataMessage,
    scale: 1.1,
    bgcolor: theme[mode].errorColor,
    hidden: false,
  }

  const { isHiddenMssg, setIsHiddenMssg, textMssg, setTestMssg, colorMssg, setColorMssg } = dataMssg;
  const [nInputSelected, setnInputSelected] = useState(-1);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [passwordState, setPasswordState] = useState('');

  const objValidations = {
    password: {
      stateValue: useState(''),
      statePassword: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: false,
        }),
      },
    },
    confirmPassword: {
      stateValue: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: false,
        }),
      },
    },
  };

  return(
    <View 
      style={ compStyles.container } >
      <Text style={ compStyles.header } >Forgot Password</Text>

      <ButtonBack 
        dataButtonBack={{ 
          ...dataButtonBack, 
          isInputFocus: true,
          onPress: ()=>{
            if(isInputFocus && isKeyboardVisible){
              setIsInputFocus(false)
              setIsKeyboardVisible(false)
            }else{
              setPagefp(pagefp-1)
            }
          }
        }} 
        styleview={{
          position: 'absolute',
          top: 115 * consts.px,
          left: -39 * consts.px,
        }} />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            position: 'absolute',
            width: 100*consts.px, 
            height: 100*consts.px,
            top: 65*consts.px,
            left: 65*consts.px,
          }}
          fill="none"
          >
          <Path
            style={{
              strokeWidth: 1.5*consts.px,
              stroke: theme[mode].icons,
            }}
            scale={100/15*consts.px}
            fill={theme[mode].icons}
            fillRule="evenodd"
            d="M5 4.636c0-.876.242-1.53.643-1.962.396-.427 1.003-.696 1.858-.696.856 0 1.462.269 1.857.694.4.431.642 1.085.642 1.961V6H5V4.636ZM4 6V4.636c0-1.055.293-1.978.91-2.643.623-.67 1.517-1.015 2.591-1.015 1.075 0 1.969.344 2.59 1.014.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1ZM3 7h9v6H3V7Z"
            clipRule="evenodd"
          />
        </Svg>

        <Svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            position: 'relative',
            width: 230*consts.px, 
            height: 230*consts.px,
            marginBottom: 50*consts.px,
          }}
          fill="none"
        >
          <Path
            scale={230/15*consts.px}
            fill={theme[mode].icons}
            fillRule="evenodd"
            d="M1.85 7.5c0-2.835 2.21-5.65 5.65-5.65 2.778 0 4.152 2.056 4.737 3.15H10.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0v1.813C12.296 3.071 10.666.85 7.5.85 3.437.85.85 4.185.85 7.5c0 3.315 2.587 6.65 6.65 6.65 1.944 0 3.562-.77 4.714-1.942a6.77 6.77 0 0 0 1.428-2.167.5.5 0 1 0-.925-.38 5.77 5.77 0 0 1-1.216 1.846c-.971.99-2.336 1.643-4.001 1.643-3.44 0-5.65-2.815-5.65-5.65Z"
            clipRule="evenodd"
          />
        </Svg>
      </View>

      <Text style={{ ...compStyles.title, marginBottom: 80*consts.px }} >Enter new password</Text>
      
      <View style={{
        //marginTop: 100 * consts.px,
        alignItems: 'center',
      }} >
        <View>
          <Input
            placeholder="Enter password"
            secretWriting={true}
            style={objValidations.password.stateValue[0].length <= 0 ? { marginBottom: 50 * consts.px } : null}
            inputMode="text"
            dCodeIcon="M5 4.636c0-.876.242-1.53.643-1.962.396-.427 1.003-.696 1.858-.696.856 0 1.462.269 1.857.694.4.431.642 1.085.642 1.961V6H5V4.636ZM4 6V4.636c0-1.055.293-1.978.91-2.643.623-.67 1.517-1.015 2.591-1.015 1.075 0 1.969.344 2.59 1.014.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1ZM3 7h9v6H3V7Z"
            dataInput={{
              ...dataInput,
              stateValue: objValidations.password.stateValue,
              statePassword: objValidations.password.statePassword,
              dataMessage: {
                ...newDataMessage,
                lineNumbers: objValidations.password.dataMessage.dataValidation[0].lineNumbers,
                text: objValidations.password.dataMessage.dataValidation[0].text,
                hidden: objValidations.password.dataMessage.dataValidation[0].hidden,
              },
              nInputSelected: nInputSelected,
              isKeyboardVisible: isKeyboardVisible,
              isRegisterInput: true,
              index: 2,
              textprops: {
                maxLength: 25,
                onFocus: () => {
                  setIsInputFocus(true)
                  setIsKeyboardVisible(true)
                  setnInputSelected(2)
                },
                onEndEditing: () => {
                  if(isKeyboardVisible){
                    setnInputSelected(3)
                  }
                },
                onBlur: () => {
                  setIsInputFocus(false)
                },
                onChangeText: (text) => {
                  objValidations.password.stateValue[1](text);

                  const length = text.length > 8;
                  const numberRegex = new RegExp('[0-9]');
                  const uppercaseRegex = new RegExp('[A-Z]');
                  const lowercaseRegex = new RegExp('[a-z]');
                  const symbolRegex = /[-:+_º·$/\[\]}{|~€|@#~€¬\`«»%()?¿¡;.'"!@#\\$//%\\^,&\\*]/;

                  //Regex to number (rtn)
                  const rtn = (regex) => regex.test(text) ? 1 : 0;

                  const safety = rtn(symbolRegex) + rtn(lowercaseRegex) + rtn(uppercaseRegex) + rtn(numberRegex) + length;
                  safety <= 3 ? setPasswordState('low') : safety < 5 ? setPasswordState('medium') : setPasswordState('high');

                  if (text.length > 0) {
                    if (text.length < 8) {
                      objValidations.password.dataMessage.dataValidation[1]({
                        hidden: false,
                        lineNumbers: 1,
                        text: 'Must have at least 8 characters',
                      });
                    } else if (!uppercaseRegex.test(text)) {
                      objValidations.password.dataMessage.dataValidation[1]({
                        hidden: false,
                        lineNumbers: 2,
                        text: 'Must contain at least one uppercase letter',
                      });
                    } else if (!lowercaseRegex.test(text)) {
                      objValidations.password.dataMessage.dataValidation[1]({
                        hidden: false,
                        lineNumbers: 2,
                        text: 'Must contain at least one lowercase letter',
                      });
                    } else if (!numberRegex.test(text)) {
                      objValidations.password.dataMessage.dataValidation[1]({
                        hidden: false,
                        lineNumbers: 2,
                        text: 'Must contain at least one number',
                      });
                    } else if (!symbolRegex.test(text)) {
                      objValidations.password.dataMessage.dataValidation[1]({
                        hidden: false,
                        lineNumbers: 2,
                        text: 'Must contain at least one symbol',
                      });
                    } else {
                      objValidations.password.dataMessage.dataValidation[1]({
                        hidden: true,
                        lineNumbers: 1,
                        text: '',
                      });
                    }
                  } else {
                    objValidations.password.dataMessage.dataValidation[1]({
                      hidden: true,
                      lineNumbers: 1,
                      text: '',
                    });
                  }
                }
              }
            }}
            />
            {
              objValidations.password.stateValue[0].length > 0 ? 
                <View
                style={{
                  position: 'relative',
                  left: -10*consts.px,
                }}
                >
                  <Text
                    style={{
                      fontSize: 30 * consts.px,
                      color: theme[mode][passwordState + 'Safety'],
                      marginTop: 20 * consts.px,
                      fontWeight: 'bold',
                    }}
                  >
                    {(passwordState + ' safety').replace(passwordState[0], passwordState[0].toUpperCase())}
                  </Text>
                  <View
                    style={{
                      height: 8 * consts.px,
                      width: passwordState === 'low' ? 110 * consts.px : passwordState === 'medium' ? 230 * consts.px : 350 * consts.px,
                      backgroundColor: theme[mode][passwordState + 'Safety'],
                      borderRadius: 10 * consts.px,
                      marginBottom: 30 * consts.px,
                    }}
                  ></View>
                </View>
              : null
            }
          </View>
            
          <Input
            placeholder="Confirm password"
            secretWriting={true}
            style={objValidations.password.stateValue[0].length <= 0 ? { marginBottom: 50 * consts.px } : {
              marginBottom: 0 * consts.px,
            } }
            inputMode="text"
            dCodeIcon="M5 4.636c0-.876.242-1.53.643-1.962.396-.427 1.003-.696 1.858-.696.856 0 1.462.269 1.857.694.4.431.642 1.085.642 1.961V6H5V4.636ZM4 6V4.636c0-1.055.293-1.978.91-2.643.623-.67 1.517-1.015 2.591-1.015 1.075 0 1.969.344 2.59 1.014.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1ZM3 7h9v6H3V7Z"
            dataInput={{
              ...dataInput,
              stateValue: objValidations.confirmPassword.stateValue,
              dataMessage: {
                ...newDataMessage,
                lineNumbers: objValidations.confirmPassword.dataMessage.dataValidation[0].lineNumbers,
                text: objValidations.confirmPassword.dataMessage.dataValidation[0].text,
                hidden: objValidations.confirmPassword.dataMessage.dataValidation[0].hidden,
              },
              nInputSelected: nInputSelected,
              isKeyboardVisible: isKeyboardVisible,
              isRegisterInput: true,
              index: 3,
              textprops: {
                maxLength: 25,
                onFocus: () => {
                  setIsInputFocus(true)
                  setIsKeyboardVisible(true)
                  setnInputSelected(3)
                },
                onBlur: () => {
                  setIsInputFocus(false)
                },
                onChangeText: (text) => {
                  objValidations.confirmPassword.stateValue[1](text);

                  if (text.length > 0 && text !== objValidations.password.stateValue[0]) {
                    objValidations.confirmPassword.dataMessage.dataValidation[1]({
                      hidden: false,
                      lineNumbers: 1,
                      text: 'Passwords do not match',
                    });
                  } else {
                    objValidations.confirmPassword.dataMessage.dataValidation[1]({
                      hidden: true,
                      lineNumbers: 1,
                      text: '',
                    });
                  }
                }
              }
            }}
            />
        
      </View>

      <ContrastingButton 
        text="Change password" 
        styles={{ ...styles, marginTop: 100*consts.px, width: 400*consts.px }}
        theme={theme} 
        mode={mode} 
        onPress={()=> setPagefp(1)}
        consts={consts}  />
    </View>
  )
}

export default ForgotPass3;
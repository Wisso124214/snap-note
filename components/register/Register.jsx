import React, { useEffect, useRef, useState } from "react";
import { Button, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, TouchableHighlight, FlatList } from "react-native";
import Logo from "../logo/Logo";
import Input from "../input/Input";
import ButtonBack from "../buttonBack/ButtonBack";
import ContrastingButton from "../contrastingButton/ContrastingButton";
import Message from "../message/Message";
import SvgIconProvider from "../svg/svgIconProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = ({ dataPages }) => {

  const { theme, styles, mode, consts, dataInput, showDebugMenu, setShowDebugMenu, setPage, devMode, dataMssg, dataButtonBack, setIsInputFocus, dataMessage } = dataPages;

  const compStyles = {
    header: {
      fontSize: 65 * consts.px,
      fontWeight: 'bold',
      color: theme[mode].color,
      textShadowColor: theme[mode].shadowTitle,
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      marginTop: 30 * consts.px,
    },
    text: {
      fontSize: 33 * consts.px,
      color: theme[mode].color,
      marginTop: 10 * consts.px,
    },
    input: {
      marginBottom: 50 * consts.px,
    },
    footText: {
      fontSize: 35 * consts.px,
      fontWeight: 'bold',
      height: 60 * consts.px,
    },
    iconQuestion: {
      position: 'relative',
      top: 10,
      left: 10,
      color: theme[mode].icons,
      px: 18*consts.px,
    },
  }
  
  const newDataMessage = {
    ...dataMessage,
    scale: 1.1,
    bgcolor: theme[mode].errorColor,
    hidden: false,
  }

  const [isHiddenIconQuestion, setIsHiddenIconQuestion] = useState(true);

  const { isHiddenMssg, setIsHiddenMssg, textMssg, setTestMssg, colorMssg, setColorMssg } = dataMssg;
  const [nInputSelected, setnInputSelected] = useState(-1);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [passwordState, setPasswordState] = useState('');

  const listUsernames = ['user2024', 'user2020', 'user12', 'user123', 'userxx']
  
  // Hidden en true sería "validation error", hidden en false sería "validation success"
  const objValidations = {
    username: {
      stateValue: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: true,
        }),
      },
    },
    email: {
      stateValue: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: true,
        }),
      },
    },
    password: {
      stateValue: useState(''),
      statePassword: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: true,
        }),
      },
    },
    confirmPassword: {
      stateValue: useState(''),
      dataMessage: {
        dataValidation: useState({
          lineNumbers: 1,
          text: '',
          hidden: true,
        }),
      },
    },
  };

  useEffect(()=>{
    if (nInputSelected >= 0 && nInputSelected < 4)
      setIsInputFocus(true)
    
  },[nInputSelected])

  useEffect(()=>{
    !isKeyboardVisible ? setIsInputFocus(false) : null
  }, [isKeyboardVisible])

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <ButtonBack 
        dataButtonBack={{ 
          ...dataButtonBack, 
          showBack: isKeyboardVisible,
          onPress: ()=>{
            setIsInputFocus(false)
            setIsKeyboardVisible(false)
          }
        }} />

      <View style={{
        position: 'absolute',
        top: isKeyboardVisible ? -300 *consts.px : 0,
      }} >
        <View 
          style={{ 
            position : 'absolute',
            flexGrow: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: 730*consts.px, 
            top: 130*consts.px,
            showsVerticalScrollIndicator: false, 
            showsHorizontalScrollIndicator: false
          }}>
        
          <View 
            style={{ 
              flex: 1, 
              justifyContent: 'center', 
              alignItems: 'center',
          }} >
            
            <TouchableHighlight
                underlayColor={theme[mode].backgroundColor}
                onPress={() => devMode[devMode.power].debugMenuEnabled ? setShowDebugMenu(!showDebugMenu) : null}
              >
                <Logo mode={mode} logoSize={200 * consts.px} />
            </TouchableHighlight>
            <Text style={compStyles.header} >Welcome!</Text>
            <Text style={compStyles.text} >Create your account</Text>
            
              <View style={{
                marginTop: 100 * consts.px,
                alignItems: 'center',
              }} >
                <Input
                  placeholder="Username"
                  style={compStyles.input}
                  inputMode="text"
                  dCodeIcon="M7.5.875a3.625 3.625 0 0 0-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 1 0 .95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 1 0 .95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 0 0 7.5.875ZM4.825 4.5a2.675 2.675 0 1 1 5.35 0 2.675 2.675 0 0 1-5.35 0Z"
                  dataInput={{
                    ...dataInput,
                    stateValue: objValidations.username.stateValue,
                    dataMessage: {
                      ...newDataMessage,
                      lineNumbers: objValidations.username.dataMessage.dataValidation[0].lineNumbers,
                      text: objValidations.username.dataMessage.dataValidation[0].text,
                      hidden: objValidations.username.dataMessage.dataValidation[0].hidden,
                    },
                    nInputSelected: nInputSelected,
                    isKeyboardVisible: isKeyboardVisible,
                    isRegisterInput: true,
                    index: 0,
                    textprops: {
                      maxLength: 20,
                      onFocus: () => {
                        setIsInputFocus(true)
                        setIsKeyboardVisible(true)
                        setnInputSelected(0)
                      },
                      onEndEditing: () => {
                        if(isKeyboardVisible){
                          setnInputSelected(1)
                        }
                      },
                      onBlur: () => {
                        setIsInputFocus(false)
                      },
                      onChangeText: (text) => {
                        objValidations.username.stateValue[1](text);

                        if (text.length < 6 && text.length > 0) {
                          objValidations.username.dataMessage.dataValidation[1]({
                            hidden: false,
                            lineNumbers: 1,
                            text: 'Must have at least 6 characters',
                          });
                        } else if (listUsernames.includes(text)) {
                          objValidations.username.dataMessage.dataValidation[1]({
                            hidden: false,
                            lineNumbers: 1,
                            text: 'This username is already taken',
                          });
                        } else {
                          objValidations.username.dataMessage.dataValidation[1]({
                            hidden: true,
                            lineNumbers: 1,
                            text: '',
                          });
                        }
                      },
                    }
                  }}
                  />

                <Input
                  placeholder="Email"
                  style={compStyles.input}
                  inputMode="email"
                  dCodeIcon="M1 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H1Zm0 1h13v.925a.448.448 0 0 0-.241.07L7.5 7.967 1.241 3.995A.448.448 0 0 0 1 3.925V3Zm0 1.908V12h13V4.908L7.741 8.88a.45.45 0 0 1-.482 0L1 4.908Z"
                  dataInput={{
                    ...dataInput,
                    stateValue: objValidations.email.stateValue,
                    dataMessage: {
                      ...newDataMessage,
                      lineNumbers: objValidations.email.dataMessage.dataValidation[0].lineNumbers,
                      text: objValidations.email.dataMessage.dataValidation[0].text,
                      hidden: objValidations.email.dataMessage.dataValidation[0].hidden,
                    },
                    nInputSelected: nInputSelected,
                    isKeyboardVisible: isKeyboardVisible,
                    isRegisterInput: true,
                    index: 1,
                    textprops: {
                      maxLength: 50,
                      onFocus: () => {
                        setIsInputFocus(true)
                        setIsKeyboardVisible(true)
                        setnInputSelected(1)
                      },
                      onEndEditing: () => {
                        if(isKeyboardVisible){
                          setnInputSelected(2)
                        }
                      },
                      onBlur: () => {
                        setIsInputFocus(false)
                      },
                      onChangeText: (text) => {
                        objValidations.email.stateValue[1](text);
                        const emailRegex = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');
                        
                        if (text.length > 0 && !emailRegex.test(text)) {
                          objValidations.email.dataMessage.dataValidation[1]({
                            hidden: false,
                            lineNumbers: 1,
                            text: 'Please enter a valid email',
                          });
                        } else {
                          objValidations.email.dataMessage.dataValidation[1]({
                            hidden: true,
                            lineNumbers: 1,
                            text: '',
                          });
                        }
                      }
                    }
                  }}
                  />
                <View >

                <Input
                  placeholder="Enter password"
                  secretWriting={true}
                  style={objValidations.password.stateValue[0].length <= 0 ? compStyles.input : null}
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
                  style={objValidations.password.stateValue[0].length <= 0 ? compStyles.input : {
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
                text="Sign up" 
                theme={theme} 
                mode={mode} 
                consts={consts} 
                styles={{ marginTop: 70 * consts.px }} 
                onPress={() => {
                  const result = 'error'; // Here should be the login logic

                  if (result === 'error') {
                    setIsHiddenMssg(false);
                    setTestMssg('User or password are wrong');
                    setColorMssg(theme[mode].errorColor);
                    setIsHiddenIconQuestion(false);

                  } else if (result === 'success') {
                    setIsHiddenMssg(false);
                  }
                }}
                />
              
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'absolute',
                bottom: -160 * consts.px,
              }} >
              <Text
                style={{
                  color: theme[mode].color,
                  ...compStyles.footText,
                }}>
                Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  setPage(1)
                }}
              >
                <Text
                  style={{
                    color: theme[mode].noColor,
                    ...compStyles.footText,
                    textShadowColor: theme[mode].color,
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 6,
                  }}>
                  Log in.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
    
  );
};

export default Register;
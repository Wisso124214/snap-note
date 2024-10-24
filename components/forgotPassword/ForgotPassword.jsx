import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from "react-native-svg"
import Input from '../input/Input';
import ButtonSign from '../contrastingButton/ContrastingButton';
import ButtonBack from '../buttonBack/ButtonBack';
import ForgotPass1 from './ForgotPass1';
import { set } from 'lodash';
import ForgotPass2 from './ForgotPass2';

const ForgotPassword = ({ dataPages }) => {
  
  const { theme, mode, consts, devMode, dataPinInput } = dataPages;
  const [pagefp, setPagefp] = React.useState(devMode[devMode.power].pagefp);

  const compStyles = {
    container: {
      flex: 1,
      justifyContent: 'start',
      alignItems: 'center',
    },
    header: {
      fontWeight: 'bold',
      fontSize: 35 * consts.px,
      color: theme[mode].icons,
      marginTop: 120 * consts.px,
      marginBottom: 80 * consts.px,
    },
    title: {
      fontSize: 45 * consts.px,
      color: theme[mode].color,
      fontWeight: 'bold',
      marginBottom: 30 * consts.px,
    },
    text: {
      fontSize: 25 * consts.px,
      color: theme[mode].color,
      marginBottom: 60 * consts.px,
    },
  }

  const dataForgotPassword = {
    dataPages: dataPages,
    compStyles: compStyles,
    pagefp: pagefp,
    setPagefp: setPagefp,
    dataPinInput: dataPinInput,
  }
  
  const forgotpassword = [
    <ForgotPass1 dataForgotPassword={dataForgotPassword} />,
    <ForgotPass2 dataForgotPassword={dataForgotPassword} />,
  ]

  return (
    <View>
      {forgotpassword[pagefp]}
    </View>
  )
}

export default ForgotPassword;
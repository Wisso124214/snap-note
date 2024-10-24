import React from 'react';
import SvgIcon from './SvgIcon';

const SvgIconProvider = (props) => {

  //src, strprops, d, styles
  //strprops: 'color, px, top, left'

  //creo la variable global styles para que la reconozca el eval
  window.styles = props.styles

  let obj = {}
  let arr = props.strprops.split(',')

  arr.forEach((item) => {
    let str = item.replace(/\s/g, '');
    obj[str] = eval(props.src+'.'+str)
  })

  return(
    <SvgIcon {...props} {...obj} d={props.d} />
  )
}

export default SvgIconProvider;
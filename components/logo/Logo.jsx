import { Image } from 'react-native';
import logodark from '../../assets/others/logo-dark.png';
import logolight from '../../assets/others/logo-light.png';

const Logo = ({ mode, logoSize }) => {
  return( 
    <Image source={ mode === 'dark' ? logodark : logolight } style={{width: logoSize, height: logoSize, left: logoSize/10 }} />
  );
}

export default Logo;
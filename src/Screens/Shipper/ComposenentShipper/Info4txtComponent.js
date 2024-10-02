import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from '../../../components/TextComponent';

const Info4txtComponent = ({
  text,
  price,
  color1,
  fontsize,
  fontFamily1,
  color2,
  fontFamily2,
}) => {
  return (
    <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
      <TextComponent
        color={color1 ? color1 : null}
        fontsize={fontsize ? fontsize : null}
        fontFamily={fontFamily1 ? fontFamily1 : null}
        text={text}
      />
      <TextComponent
        color={color2 ? color2 : null}
        fontsize={fontsize? fontsize : null}
        fontFamily={fontFamily2 ? fontFamily2 : null}
        text={price}
      />
    </View>
  );
};

export default Info4txtComponent;

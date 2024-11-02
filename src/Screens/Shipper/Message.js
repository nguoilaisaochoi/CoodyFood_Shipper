import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {appColor} from '../../constants/appColor';
import HeaderComponent from '../../components/HeaderComponent';
import TextComponent from './ComposenentShipper/TextComponent';
import {getSocket} from '../../socket/socket';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Message = () => {
  const Data = data;
  const shipper = Data[0].name;
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const {getData} = useSelector(state => state.shipper);
  const roomID = '1234';
  const flatListRef = useRef();

  useEffect(() => {
    // Kết nối socket
    const socketInstance = getSocket();
    // Lấy dữ liệu từ localStorage khi component được khởi tạo
    fetchMessages();
    // Lắng nghe socket
    socketInstance.on('receive_message', dataGot => {
      setMessageList(oldMsgs => {
        const newMsgs = [...oldMsgs, dataGot];
        // Lưu messageList vào localStorage
        setMessageList(newMsgs);
        AsyncStorage.setItem('messageList', JSON.stringify(newMsgs));
        return newMsgs;
      });
    });
  }, []);
  const fetchMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('messageList');
      if (storedMessages) {
        setMessageList(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error('Lỗi khi fetching messages từ AsyncStorage:', error);
    }
  };
  useEffect(() => {
    if (messageList) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messageList]);

  //gửi tin lên socket room
  const handleSend = () => {
    const socketInstance = getSocket();
    if (message) {
      const data = {
        time: Date.now(),
        name: getData.name,
        text: message,
      };
      socketInstance.emit('send_message', {roomID, data});
      setMessage('');
    } else {
      console.log('message trống');
    }
  };

  //item flatlist
  const renderItem = ({item}) => {
    const {text, time, name} = item;
    const date = new Date(time);
    return (
      <View
        style={[
          styles.chat,
          {flexDirection: name == getData.name ? 'row-reverse' : 'row'},
        ]}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://res.cloudinary.com/djywo5wza/image/upload/v1726318840/Rectangle_201_ltuozm.jpg',
          }}
        />
        <View
          style={[
            styles.text,
            {
              backgroundColor:
                name == getData.name ? appColor.gray : appColor.primary,
            },
          ]}>
          <TextComponent
            text={text}
            fontsize={14}
            color={name == getData.name ? appColor.text : appColor.white}
          />
          <TextComponent
            text={date.getHours() + ':' + date.getMinutes()}
            fontsize={12}
            color={name == getData.name ? appColor.text : appColor.white}
          />
        </View>
      </View>
    );
  };
  //
  return (
    <View style={styles.container}>
      <HeaderComponent text={'Tên khách hàng'} isback={true} />
      <FlatList
        ref={flatListRef}
        data={messageList}
        renderItem={renderItem}
        keyExtractor={item => item.time}
      />
      <View style={styles.input}>
        <Image
          style={[styles.icon, {width: '8%'}]}
          source={require('../../assets/images/shipper/smile.png')}
        />
        <TextInput
          style={styles.textinput}
          value={message}
          onChangeText={text => {
            setMessage(text);
          }}
          placeholder=" Nhập tin nhắn của bạn vào đây......."
          placeholderTextColor={appColor.subText}
          color={appColor.text}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.icon, {width: '14%'}]}
          onPress={() => {
            handleSend();
          }}>
          <Image
            style={{width: '100%', resizeMode: 'contain'}}
            source={require('../../assets/images/shipper/send.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Message;
const styles = StyleSheet.create({
  container: {
    paddingTop: '12%',
    flex: 1,
    backgroundColor: appColor.white,
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingBottom: '3%',
  },
  chat: {
    flexShrink: 1,
    gap: 10,
    justifyContent: 'flex-start',
    marginBottom: '5%',
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  text: {
    maxWidth: '80%',
    borderRadius: 10,
    padding: '4%',
  },
  flatlist: {
    flex: 1,
    gap: 38,
    backgroundColor: 'pink',
  },
  input: {
    height: 70,
    borderTopWidth: 1,
    borderColor: appColor.input,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
  },
  icon: {
    flexGrow: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    width: '78%',
    padding: '2%',
  },
});

const data = [
  {
    name: 'shippervip',
    chat: [
      {
        customer: 'Anh long',
        text: [
          {
            id: 1,
            name: 'Anh Long',
            text: 'Chào bạn, bạn có khỏe không?aaaaaaaaaaaaaaaa',
            time: '99:98',
          },
          {
            id: 2,
            name: 'shippervip',
            text: 'Mình khỏe, cảm ơn bạn! Bạn thì sao?',
            time: '99:99',
          },
          {
            id: 3,
            name: 'shippervip',
            text: 'hi?',
            time: '99:99',
          },
          {
            id: 4,
            name: 'Anh Long',
            text: 'hi?',
            time: '99:99',
          },
          {
            id: 5,
            name: 'shippervip',
            text: 'hi?',
            time: '99:99',
          },
          {
            id: 6,
            name: 'shippervip',
            text: 'hi?',
            time: '99:99',
          },
          {
            id: 7,
            name: 'Anh Long',
            text: 'hi?',
            time: '99:99',
          },
        ],
      },
    ],
  },
];

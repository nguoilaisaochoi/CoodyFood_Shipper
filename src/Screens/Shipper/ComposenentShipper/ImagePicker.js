import {Alert, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//yêu cầu quyền
const cameraOptions = {
  cameraType: 'front',
  saveToPhotos: false,
};
//yêu cầu quyền
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.log(err);
    return false;
  }
};
//kiểm tra quyền
const checkCameraPermission = async () => {
  const permissionStatus = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  return permissionStatus;
};
//mở camera
export const onOpenCamera = async setImagePath => {
  //check quyền
  const hasPermission = await checkCameraPermission();
  if (!hasPermission) {
    const granted = await requestCameraPermission();
    if (!granted) {
      Alert.alert('Quyền camera bị từ chối');
      return;
    }
  }
  try {
    //mở camera&chụp ảnh
    const response = await launchCamera(cameraOptions);
    if (response?.assets) {
      setImagePath(response.assets[0]);
      //del
      console.info(
        '\x1b[36m[ImagePicker___LaunchCamera]\x1b[0m',
        JSON.stringify(response.assets),
      );
    } else {
      console.error('[ImagePicker___LaunchCamera]', response.errorMessage);
    }
  } catch (error) {
    console.error('[ImagePicker___LaunchCamera]', error.message);
  }
};

//mở thư viện ảnh
export const onImageLibrary = async setImagePath => {
  try {
    const response = await launchImageLibrary();
    if (response?.assets) {
      setImagePath(response.assets[0]);
      //del
      console.info(
        '\x1b[36m[ImagePicker___LaunchImageLibrary]\x1b[0m',
        JSON.stringify(response.assets),
      );
    } else {
      console.error('[ImagePicker___LaunchImageLibrary]', response.errorMessage);
    }
  } catch (error) {
    console.error('[ImagePicker___LaunchImageLibrary]', error.message);
  }
};

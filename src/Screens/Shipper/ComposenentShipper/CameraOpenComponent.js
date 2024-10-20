import {Alert, PermissionsAndroid} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
//yêu cầu quyền
const cameraOptions = {
  cameraType: 'front',
  saveToPhotos: true,
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
export const onOpenCamera = async (setImagePath) => {
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
      setImagePath(response.assets[0].uri);
      console.log(response.assets);
    } else {
      console.log('Có lỗi xảy ra', response.errorMessage);
    }
  } catch (error) {
    console.log('Có lỗi xảy ra', error.message);
  }
};

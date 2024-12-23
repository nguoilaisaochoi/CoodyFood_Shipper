import { APICloudinary,APIkey } from '@env';
export const uploadImageToCloudinary = async file => {
  try {
    const url = APICloudinary;
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    formData.append('timestamp', Date.now() / 1000);
    formData.append('api_key', APIkey);
    formData.append('folder', 'coodyfood');
    formData.append('upload_preset', 'woedj14o');

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      console.info('\x1b[35m[UploadImage___Cloudinary]\x1b[0m', JSON.stringify(data.url, null, 2));
      return data.url;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

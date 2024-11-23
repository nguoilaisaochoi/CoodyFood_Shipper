export const uploadImageToCloudinary = async file => {
  try {
    const url = `https://api.cloudinary.com/v1_1/djywo5wza/image/upload`;

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    formData.append('timestamp', Date.now() / 1000);
    formData.append('api_key', 587196265671728);
    formData.append('folder', 'coodyfood');
    formData.append('upload_preset', 'woedj14o');

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return data.url;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

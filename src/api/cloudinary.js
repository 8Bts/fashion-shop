const cloudinary = (() => {
  const API_KEY = '537585132569355';
  const URL = 'https://api.cloudinary.com/v1_1/strawberry-cloud/image/upload';
  const API_SECRET = 'N7ul2WmfS_KcCQStElL6OdJ-5Vc';

  async function digest(str) {
    const msgUint8 = new TextEncoder().encode(str); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

  const upload = async (image) => {
    const timestamp = Date.now();
    const stringToSign = `eager=c_pad,h_300,w_400|c_crop,h_200,w_260&folder=fashion-shop&timestamp=${timestamp}${API_SECRET}`;
    const signature = await digest(stringToSign);
    const formData = new FormData();

    formData.append('file', image);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260');
    formData.append('folder', 'fashion-shop');

    const response = await fetch(URL, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  };

  return { upload };
})();

export default cloudinary;

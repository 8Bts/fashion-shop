const cloudinary = (() => {
  const API_KEY = '537585132569355';
  const URL = 'https://api.cloudinary.com/v1_1/strawberry-cloud';
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
    const stringToSign = `folder=fashion-shop&return_delete_token=true&timestamp=${timestamp}${API_SECRET}`;
    const signature = await digest(stringToSign);
    const formData = new FormData();

    formData.append('file', image);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', 'fashion-shop');
    formData.append('return_delete_token', 'true');

    const response = await fetch(`${URL}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  };

  const destroy = async (deleteToken) => {
    const response = await fetch(`${URL}/delete_by_token?token=${deleteToken}`, { method: 'POST' });
    return response;
  };

  return { upload, destroy };
})();

export default cloudinary;

const item = (() => {
  const URL = 'https://fashion-shop-api.herokuapp.com';

  const all = async () => {
    const response = await fetch(`${URL}/items`);
    return response.json();
  };

  const get = async (id) => {
    const response = await fetch(`${URL}/items/${id}`);
    return response.json();
  };

  const create = async (title, price, img, category, imgPublicId) => {
    const response = await fetch(`${URL}/items?title=${title}&price=${price}&image=${img}&category=${category}&img_public_id=${imgPublicId}`, { method: 'POST' });
    return response.json();
  };

  const update = async (id, title, price, img, category, imgPublicId) => {
    const response = await fetch(`${URL}/items/${id}?title=${title}&price=${price}&image=${img}&category=${category}&img_public_id=${imgPublicId}`, { method: 'PUT' });
    return response;
  };

  const drop = async (id) => {
    const response = await fetch(`${URL}/items/${id}`, { method: 'DELETE' });
    return response;
  };

  return {
    all, get, create, update, drop,
  };
})();

export default item;

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

  const create = async (title, price, img) => {
    const response = await fetch(`${URL}/items?title=${title}&price=${price}&image=${img}`, { method: 'POST' });
    return response.json();
  };

  const update = async (id, title, price, img) => {
    const response = await fetch(`${URL}/items/${id}?title=${title}&price=${price}&image=${img}`, { method: 'PUT' });
    return response.json();
  };

  const drop = async (id) => {
    const response = await fetch(`${URL}/items/${id}`, { method: 'DELETE' });
    return response.json();
  };

  return {
    all, get, create, update, drop,
  };
})();

export default item;

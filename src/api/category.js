const category = (() => {
  const URL = 'https://fashion-shop-api.herokuapp.com';

  const all = async () => {
    const response = await fetch(`${URL}/categories`);
    return response.json();
  };

  const get = async (id) => {
    const response = await fetch(`${URL}/categories/${id}`);
    return response.json();
  };

  const create = async (name) => {
    const response = await fetch(`${URL}/categories?name=${name}`, { method: 'POST', mode: 'cors' });
    return response.json();
  };

  const update = async (id, name) => {
    const response = await fetch(`${URL}/categories/${id}?name=${name}`, { method: 'PUT' });
    return response.json();
  };

  const drop = async (id) => {
    const response = await fetch(`${URL}/categories/${id}`, { method: 'DELETE' });
    return response.json();
  };

  return {
    all, get, create, update, drop,
  };
})();

export default category;

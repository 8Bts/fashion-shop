const user = (() => {
  const URL = 'https://fashion-shop-api.herokuapp.com';

  const all = async () => {
    const response = await fetch(`${URL}/users`);
    return response.json();
  };

  const get = async (id) => {
    const response = await fetch(`${URL}/users/${id}`);
    return response.json();
  };

  const create = async (name, adminLevel = 0) => {
    const response = await fetch(`${URL}/users?name=${name}&admin_level=${adminLevel}`, { method: 'POST' });
    return response.json();
  };

  const update = async (id, name, adminLevel = 0) => {
    const response = await fetch(`${URL}/users/${id}?name=${name}&admin_level=${adminLevel}`, { method: 'PUT' });
    return response.json();
  };

  const drop = async (id) => {
    const response = await fetch(`${URL}/users/${id}`, { method: 'DELETE' });
    return response.json();
  };

  return { all, get, create, update, drop };
})();

export default user;
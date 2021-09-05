import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import signin from '../styles/signin.module.css';
import API from '../api/index';

const SignUp = ({ logUser }) => {
  const [flash, setFlash] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = document.querySelector(`.${signin.input_name}`);

    API.users.create(input.value).then((res) => {
      if (res.message) throw res.message;
      logUser(res);
      window.location.replace('/');
    }).catch((error) => setFlash(error));
  };

  return (
    <div className={signin.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={signin.form_cont}>
          <h1>Sign Up</h1>
          <span className={`${signin.sub} mb-5`}>
            Welcome! Type your username below and create your account
          </span>
          <input type="text" className={`${signin.input_name} form-control rounded-pill mb-3`} placeholder="Username" required />
          <ul className={signin.flash}>
            {flash.map((msg) => (
              <li key={Math.random() * 100}>{msg}</li>
            ))}
          </ul>
          <button type="submit" className={`${signin.btn} btn rounded-pill mb-3`}>Register</button>
          <Link to="/signin" className={signin.translink}>Sign in</Link>
        </div>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  logUser: PropTypes.func.isRequired,
};

export default SignUp;

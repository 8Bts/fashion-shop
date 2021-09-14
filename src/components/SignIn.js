import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import signin from '../styles/signin.module.css';
import API from '../api/index';

const SignIn = ({ logUser }) => {
  const [flash, setFlash] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = document.querySelector(`.${signin.input_name}`);
    API.users.find(input.value).then((res) => {
      if (res.message) throw res.message;
      logUser(res);
      window.location.replace('/');
    }).catch((error) => setFlash(error));
  };

  return (
    <div className={signin.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={signin.form_cont}>
          <h1>Sign in</h1>
          <span className={`${signin.sub} mb-5`}>
            Hi there! Sign in start picking favourite clothes
          </span>
          <input type="text" className={`${signin.input_name} form-control rounded-pill mb-1`} placeholder="Username" required />
          <span className={signin.flash}>{flash}</span>
          <button type="submit" className={`${signin.btn} btn rounded-pill my-3`}>Sign In</button>
          <Link to="/signup" className={signin.translink}>Create account</Link>
        </div>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  logUser: PropTypes.func.isRequired,
};

export default SignIn;

import { Link } from 'react-router-dom';
import signin from '../styles/signin.module.css';

const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.replace('/');
  };

  return (
    <div className={signin.wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={signin.form_cont}>
          <h1>Sign in</h1>
          <span className={`${signin.sub} mb-5`}>
            Hi there! Sign in start picking favourite clothes
          </span>
          <input type="text" className={`${signin.input_name} form-control rounded-pill mb-3`} placeholder="Username" required />
          <button type="submit" className={`${signin.btn} btn rounded-pill mb-3`}>Sign In</button>
          <Link to="/signup" className={signin.translink}>Create account</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

import signin from '../styles/signin.module.css';

const SignIn = () => {
  const handleSubmit = () => {};

  return (
    <div className={signin.wrapper}>
      <form onSubmit={handleSubmit}>
        <div class={signin.form_cont}>
          <h1>Sign in</h1>
          <span className={`${signin.sub} mb-5`}>Hi there! Sign in start picking favourite clothes</span>
          <input type="email" class={`${signin.input_name} form-control rounded-pill mb-3`} required />
          <button type="submit" class={`${signin.btn} btn rounded-pill mb-3`}>Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
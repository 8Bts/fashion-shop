import signin from '../styles/signin.module.css';

const SignUp = () => {
  const handleSubmit = () => {};

  return (
    <div className={signin.wrapper}>
      <form onSubmit={handleSubmit}>
        <div class={signin.form_cont}>
          <h1>Sign Up</h1>
          <span className={`${signin.sub} mb-5`}>Welcome! Type your username below and create your account</span>
          <input type="email" class={`${signin.input_name} form-control rounded-pill mb-3`} placeholder="Username" required />
          <button type="submit" class={`${signin.btn} btn rounded-pill mb-3`}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
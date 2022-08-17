import './Login.css'
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    
    const [loginError, setLoginError] = useState(false);

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        // onSubmit: () => handleSignIn(),
      })

return (
    <div className='loginForm'>
        <h1>Zaloguj się</h1>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor='email'>
        {
          formik.errors.email && formik.touched.email
          ? <p className='formError'>{formik.errors.email}</p> 
          : <p className='formLabel'>E-mail</p>
        }
        </label>
        <input 
          name='email' 
          placeholder='E-mail' 
          type="text" 
          onBlur={formik.handleBlur}
          value={formik.values.email} 
          onChange={formik.handleChange}
        />

        <label htmlFor='password'>
        {
          formik.errors.password && formik.touched.password
          ? <p className='formError'>{formik.errors.password}</p> 
          : <p className='formLabel'>Password</p>
        }
        </label>
        <input 
          name='password' 
          placeholder='Password' 
          type="password" 
          onBlur={formik.handleBlur}
          value={formik.values.password} 
          onChange={formik.handleChange}
        />

        

        <a href='' style={{color: '#577590'}}>Forgot your password?</a>

        <div className='buttonsContainer'>
          <Link to={'/register'} className='button' >Sign Up!</Link>
          <button className='button' type='submit'>Sign in!</button>
        </div>

        {loginError && <p style={{color: 'red', marginTop: '20px', textAlign: 'center', fontSize: '21px'}}>Invalid credentials.</p>}
      </form>
    </div>
  )
}

export default Login;
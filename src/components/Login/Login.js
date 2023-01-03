import React from 'react';
import './Login.css';
import axios from '../../api/axios';
import {useEffect,useState,useRef} from 'react';
import UseAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const LOGIN_URL = 'users/login';



function Login() {
  // const {setAuth} = useAuth();
  const { setAuth } = UseAuth()

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errMsg, setErrmsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
    
  }, []);

  useEffect(() => {
   setErrmsg('')    
  }, [Email,Password]);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({Email,Password}),
        {
          headers: {'Content-Type':'application/json'},
          withCredentials: true         
        });
        console.log(response)
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        const user = response?.data?.user;
      setAuth({Email,Password,roles,accessToken,user});
      setEmail('');
      setPassword('');
      navigate(from,{replace: true});
      
    } catch (error) {
      console.log(error);
      console.log(error?.response)
      if (!error?.response) {
        console.log(errMsg.response)
        setErrmsg('No Server Response')
      } else if (error.response?.status === 400) {
        setErrmsg('Missing username or password')
      } else if (error.response?.status === 401) {
        setErrmsg('UnAuthorized')
      }
      else if (error.response?.status === 501) {
        setErrmsg('Email Not Registered')
      }else {
        setErrmsg('Login Failed')
      }
      errRef.current.focus();
    }
    

  }


  return (
    <section className='Parent'>
    <div className='LoginForm'>
        <div className='icon'>
        <img src='/logo512.png' alt='icon'/>
        </div>
        <div className='Login'>
        <p ref={errRef} className={errMsg ? 'errmsg' :
        'offscreen'} aria-live='assertive'>{errMsg}</p> 
            <h2 className='pt-28'>Login:</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input type={'email'} autoComplete='off' id='email' ref={userRef} onChange={(e)=> setEmail(e.target.value)} value={Email} required/>
            <label htmlFor='password'>Password:</label>
            <input type={'password'} autoComplete='off' id='password' onChange={(e)=> setPassword(e.target.value)} value={Password} required  />
            <Link className='forget' to="/forgetpassword">Forgotten Password?</Link>
            <button type={'submit'}>Login</button>
            </form>
        </div>
    </div>
    </section>
  )
}

export default Login
import './Register.css';
import {useEffect,useState,useRef} from 'react';
import { faCheck,faTimes,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  Link } from "react-router-dom";
import axios from '../../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'users/register';

function Register() {
  const options = [
    {
      label: "Admin",
      value: "Admin",
    },
    {
      label: "User",
      value: "User",
    },
    {
      label: "Manager",
      value: "Manager",
    }];
  const [roles, setRoles] = useState('User');
  const [Email, setEmail] = useState('');
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validation, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setUserPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setUserMatchFocus] = useState(false);

  const [errMsg, setErrmsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    
  }, []);

  useEffect(() => {
   const result = USER_REGEX.test(user);
   console.log(result);
   console.log(user);
   setValidName(result);
    
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
   }, [pwd,matchPwd]);

   useEffect(() => {
    setErrmsg('');
   }, [user,pwd,matchPwd]);

   const handleSubmit = async (e)=> {
      e.preventDefault();
      // if some one try to hack
      const v1 =  USER_REGEX.test(user);
      const v2 =  PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
        setErrmsg('Invalid Entry');
        return;
      }
      try {
        const response = await axios.post(REGISTER_URL,JSON.stringify({Name:user,Email: Email,Password:pwd,Password2:matchPwd,Roles:roles}),{
          headers: {'Content-Type':'application/json'},
          withCredentials: true
        }
      );
      console.log(response.data);
      setSuccess(true);
      // clear inputs filed
      } catch (error) {
        if (!error?.response) {
          setErrmsg('No Server Response')
        } else if (error.response?.status === 409) {
          setErrmsg('user Is  Taken')
        } else {
          setErrmsg('Registration Failed')
        }
        errRef.current.focus();
      }
      // console.log(user,pwd);
      // setSuccess(true);
   }

  return (
    <>
    {success ? (
      <section>
        <h2>Success</h2>
      <p className='LoginSuccess'><Link to="/users" className='Succ' >Show all users</Link></p></section>
    ) : (

    <section className='SignUpForm'>
        <div className='icon'>
        <img src='/logo512.png' alt='icon'/>
        </div>
        <div className='Login'>
        <p ref={errRef} className={errMsg ? 'errmsg' :
        'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h2>SignUp:</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor='username'>
             Name:
              <span className={validation ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validation || !user ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </label>
            <input ref={userRef}  type={'text'} id='username' autoComplete='username' onChange={(e)=> setUser(e.target.value)} required aria-invalid={validation ? 'false' : 'true'} aria-describedby='uidnote' onFocus={()=> setUserFocus(true)} onBlur={()=> setUserFocus(false)}/>
            <p id='uidnote' className={userFocus && user && !validation ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br/>
              Must begin with a letter.<br/>
              Letters , Numbers , underscores,hyphens allowed.
            </p>
            <label>Email:</label>
            <input type={'email'} autoComplete='email' required value={Email} onChange={(e)=> setEmail(e.target.value)}/>
            {/* <label>BirthDay:</label>
            <input type={'date'} autoComplete='date'/>
            <label>Mobile:</label>
            <input type={'tel'} autoComplete='mobile'/> */}
            <label>Role:</label>
            <select value={roles} onChange={(e)=> setRoles(e.target.value)}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
            <label  htmlFor='password'>Password:
            <span className={validPwd ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </label>
            <input type={'password'} autoComplete='new-password' id='password' onChange={(e)=> setPwd(e.target.value)} required aria-invalid={validPwd ? 'false' : 'true'} aria-describedby='pwdnote' onFocus={()=> setUserPwdFocus(true)} onBlur={()=> setUserPwdFocus(false)} />
            <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br/>
              Must include UpperCase and LowerCase letters , a number and a special character.<br/>
              allowed special characters. <span aria-label='exclamation
              mark'>!</span><span aria-label='at
              symbol'>@</span><span aria-label='hashtag'>#</span><span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>
            </p>
            <label htmlFor='confirm_pwd'>Confirm Password:
            <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
            </label>
            <input type={'password'} autoComplete='new-password'  id='confirm_pwd' onChange={(e)=> setMatchPwd(e.target.value)} required aria-invalid={validMatch ? 'false' : 'true'} aria-describedby='matchnote' onFocus={()=> setUserMatchFocus(true)} onBlur={()=> setUserMatchFocus(false)}/>
            <p id='matchnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match password.</p>
            <button disabled={!validation || !validPwd || !validMatch ? true : false} type={'submit'}  >SignUp</button>
            </form>
        </div>
    </section>
     )}</>
      )
}

export default Register;
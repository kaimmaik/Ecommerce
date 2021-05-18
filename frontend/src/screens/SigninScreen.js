import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import {LoadingBox} from '../components/LoadingBox';
import {MessageBox} from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="box">
      <div className="container ">
      <div className="form">        
          <h2>Sign In</h2>
        
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <form onSubmit={submitHandler}>

          <div className="inputBox">  
          <input
            type="email"
            id="email"
            // placeholder="Enter email"
            placeholder="Email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div  className="inputBox">
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="inputBox">
          <input value="Login" type="submit"/>
            
        </div>
        <div>
          <label />
          <div className="forget">
          <label />
          <label />
            
            <p>New customer?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
            </p>
          </div>
        </div>
      
      </form>
    </div>
    </div>
    </div>
  );
}
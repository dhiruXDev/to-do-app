import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { saveUserToken } from '../../helper/token';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = () => {
    setLoading(true)
    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data?.token) {
        saveUserToken(data?.token)
        setMsg("")
        navigate("/");
      }
      else {
        setMsg(data?.msg)
      }
      setLoading(false)
    })
    .catch(error => {
      setMsg(error)
      setLoading(false)
    });
  };

  return (
    <div className="container py-3 w-100 ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-outline-secondary">
            <div className="App">
              <div className="card-header">
                <h4 className="mb-0">Login</h4>
              </div>
              <div className="card-body">

                {loading && <Loading />}
                {msg && <p className='text-danger'>{msg}</p>}
                <div class="form-group">
                  <label>Email:</label>
                  <input class="form-control" type="email" value={email} onChange={handleEmailChange} />
                  
                </div>                
                <div class="form-group">
                  <label>Password:</label>
                  <input class="form-control" type="password" value={password} onChange={handlePasswordChange} />                  
                </div>               
                
                <div className="form-check small pl-0 pb-2">
                  <label class="form-check-label">
                    <Link className="text-dark" to={"/register"}>If you don't have an account already then click here to "Register"</Link>
                  </label>
                  {token && (
                    
                    <div>
                      <h2>Token:</h2>
                      <p>{token}</p>
                    </div>
                    
                  )}
                </div>
                <button className="btn btn-success btn-md" onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

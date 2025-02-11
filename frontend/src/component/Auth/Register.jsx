import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { saveUserToken } from '../../helper/token';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState('');
  const [validation, setValidation] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    let errors = {...validation}
    errors.name = "";
    setValidation(errors)

    setName(event.target.value) 
  };
  const handleEmailChange = (event) => {
    let errors = {...validation}
    errors.email = "";
    setValidation(errors);
    setEmail(event.target.value)
  };
  const handlePasswordChange = (event) => {
    let errors = {...validation}
    errors.password = "";
    setValidation(errors);

    setPassword(event.target.value)};

  useEffect(() => {
    
  }, [validation]);
  const handleRegister = () => {
    if(checkValidation()) {
       setLoading(true)
        fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == 412) {
        setMsg(data.message )
      }
      else if (data?.status == 200 && data?.token) {
        saveUserToken(data?.token)
        setMsg("")
        navigate("/");
      }
      else {
        // setMsg("Oops! Something went wrong")
      }
      setLoading(false)
    })
    .catch(error => {
      console.log(error, 444)
      setMsg("Oops! Something went wrong")
      setLoading(false)
    });
    }
   
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }
  const checkValidation = () => {
    let errors = {...validation}
    let isValid = true;
    //first Name validation
    if (!name.trim()) {
      errors.name = "First name is required";
    } else {
      errors.name = "";
    }

    // email validation

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Please Enter a valid email address";
    } else {
      errors.email = "";
    }

    //password validation
    const cond1 = "/^(?=.*[a-z]).{6,20}$/";
    const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
    const cond3 = "/^(?=.*[0-9]).{6,20}$/";
    const pass = password;
    if (!pass) {
      errors.password = "password is required";
      isValid= false;
    } else if (pass.length < 8) {
      errors.password = "Password must be longer than 8 characters";
      isValid= false;
    } else if (pass.length >= 20) {
      errors.password = "Password must shorter than 20 characters";
    } else {
      errors.password = "";

    }
    setValidation(errors);
    if(errors.name || errors.email || errors.password) {
      isValid = false;
    }
   

    return isValid;

  };
  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-outline-secondary">
            <div className="card-header">
              <h4 className="mb-0">Register</h4>
            </div>
              <div className="card-body">
              {loading && <Loading />}
              {msg && <p className='text-danger'>{msg}</p>}
              <div class="form-group">
                <label>Full Name:</label>
                <input type="text" className='form-control' value={name} onChange={handleNameChange} />
                  {validation.name && <span className='text-danger'>{validation.name}</span>}                
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" className='form-control'  value={email} onChange={handleEmailChange} />
                {validation.email && <span className='text-danger'>{validation.email}</span>}                
              </div> 
              <div class="form-group">           
                <label>Password:</label>
                  <input type="password" className='form-control'  value={password} onChange={handlePasswordChange} />
                  {validation.password && <span className='text-danger'>{validation.password}</span>}                
              </div>
              <div className="form-check small pl-0 pb-2">
                <label class="form-check-label">
                  <Link className="text-dark" to={"/login"}>If you already have an account, just login.</Link>
                </label>
              </div>
              <button onClick={handleRegister} class={"btn btn-success btn-md"}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

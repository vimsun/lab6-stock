import React, { Component, useState, useEffect, useLayoutEffect} from 'react';
import { Button, Grid, Col, ControlLabel, Form, FormGroup } from 'react-bootstrap';
import { Input} from 'reactstrap';


export default function Login() { 

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [email_success, setEmailSuccess] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email_error, setEmailError] = useState('login');
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    console.log(sessionStorage);
    dismissError();
  }, []);

  
 
  let dismissError = () => {
    setError('');
  }


  let checkFields = () => {
    var count = 0;
    if (!email) {
      setEmailError('Email is required');
      setEmailSuccess('error');
      count++;
    }

    return count;
  }

  let handleSubmit = (evt) => {
    evt.preventDefault();

    if(checkFields() > 0){
      setMessage('Fill all required fields!');
      return;
    }

    if(email === 'admin') {
      sessionStorage.setItem('isAdmin', true);
      window.location.replace("/brokers");
      return;
    }

    console.log(email)
    fetch('http://localhost:3004/users?email=' + email)
    .then(response => response.json())
    .then(user => {
        if (user[0]) {
            console.log(user[0])
            sessionStorage.setItem('user',  JSON.stringify(user[0]));
            console.log(sessionStorage)
            window.location.replace("/");
        }
        else {
            setMessage('Wrong email! Try once more');
        }
    });

    return setError('');
  }


  let handleUserChange = (evt) => {
    setEmail(evt.target.value);
  };

  let logout = (evt) => {
    console.log(sessionStorage);
    sessionStorage.removeItem('user');
    console.log(sessionStorage);
  }

    return (
      <div className={'App'}>
        {logout()}
          <Col className="rows">
            <div className="Login">
              <h2 align = "center">Login</h2>
              <Form horizontal>

                  <Form.Group className="formHorizontal" validationState={email_success}>
                  <Form.Label  >
                    Email
                  </Form.Label>
                    <Col >                      
                      <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder={email_error}
                          value={email}
                          onChange={handleUserChange}
                      />
                    </Col>
                  </Form.Group>

                  <h5 align = "center">{message}</h5>
                  
                  <p className="buttons button" align='center'>
                    <Button variant="outline-info" onClick={handleSubmit}>Log In</Button>
                  </p>

              </Form>
            </div>
          </Col>
      </div>
    )
}


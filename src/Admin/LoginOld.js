import React, { useState } from 'react';
import LoginImage from "./login-image.jpg"
import './Login.css'
import { Alert, AlertTitle, Button, ButtonGroup, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login2() {
    const [obj, setLoginID] = useState({ username: '', password: '' });
    const [alert, setAlert] = useState(false);
    let a = localStorage.getItem('username');
    let b = localStorage.getItem('password');
    console.log(a, b);
    let toNavigate = useNavigate();

    let onHandleClick = () => {
        if (obj.password === b && obj.username === a) {
            // Credentials are correct, navigate to the next page
            toNavigate('/NextPage');
        } else {
            // Show alert for incorrect credentials
            setAlert(true);
        }
    };

    return (
        <div className='login-body'>
            <div className='login-box'>
                <div className='login-image'>
                    <img src={LoginImage} alt='' />
                </div>
                <div className='login-container'>
                    <div className='login-wrapper'>
                        <div className='login-field'>
                            <TextField 
                                id="outlined-basic" 
                                label="User Name" 
                                variant="outlined" 
                                onChange={(e) => setLoginID({ ...obj, username: e.target.value })}
                                style={{ width: '100%', fontWeight: "bold", color: "rgb(255, 255, 255)" }} 
                                type="text" 
                                name="user_name" 
                                placeholder="Enter Your User Name" 
                            />
                        </div>
                        <div className='login-field'>
                            <TextField 
                                id="outlined-basic" 
                                label="Password" 
                                variant="outlined" 
                                onChange={(e) => setLoginID({ ...obj, password: e.target.value })}
                                style={{ width: '100%' }} 
                                type="password" 
                                name="password" 
                                placeholder='Enter Password' 
                            />
                        </div>
                        <ButtonGroup
                            color="primary"
                            disabled={false}
                            orientation="vertical"
                            size="large"
                            aria-label="large button group"
                            style={{ width: "100%" }}
                        >
                            <Button 
                                color="primary" 
                                style={{ color: "rgb(255, 255, 255)", backgroundColor: "rgb(0,0,0,0.5)" }} 
                                className='login-button !important' 
                                onClick={() => { onHandleClick() }} 
                                type="submit" 
                                value="login"
                            >
                                Login
                            </Button>
                            <br />
                        </ButtonGroup>
                    </div>
                    <div>
                        {alert && 
                            <Alert severity="error" onClose={() => setAlert(false)}>
                                <AlertTitle>Error</AlertTitle>
                                Username or password is incorrect — <strong>check it out!</strong>
                            </Alert>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login2;

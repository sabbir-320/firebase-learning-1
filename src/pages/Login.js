import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase/firebase.config';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
    })

    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(result =>{
            const {displayName, email, photoURL} = result.user;
            const userSingedIn = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(userSingedIn)
        })
    }
    return (
        <div>
            <h1>Login with Google</h1>
            {
                user.isSignedIn && <div>
                    <img style={{width: "14%"}} src={user.photo} alt=""/>
                    <h3>Name: {user.name} </h3>
                    <p> {user.email} </p>
                </div>
            }
            <button onClick={handleSignIn}>SignIn</button>
        </div>
    );
};

export default Login;
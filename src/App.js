import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handler = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(result =>{
      const {displayName, email, photoURL} = result.user;
      const state = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(state);
      
    })
  }
  const handlerOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      const signOut = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signOut);
    })
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handlerOut}>Sign out</button> : <button onClick={handler}>Sign in</button>
      }
      
      {
        user.isSignedIn && <div>
          <h4> {user.name} </h4>
          <p> {user.email} </p>
          <img src={user.photo} alt=""/>
        </div>
      }
    </div>
  );
}

export default App;

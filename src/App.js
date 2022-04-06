import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';
import { GithubAuthProvider } from "firebase/auth";

const auth = getAuth(app);

function App() {
  const[user, setUser]= useState({});

  const googleprovider = new GoogleAuthProvider();
  const githubprovider = new GithubAuthProvider();
  const handleGoogleSignIn =() =>{
    signInWithPopup(auth, googleprovider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user)

    })
    .catch(error =>{
      console.log('error' , error)
    })
  }
  const handleGithubSignIn = () =>{
    signInWithPopup(auth, githubprovider)
    .then( result =>{
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error =>{
      console.error(error)
    })
  }
  const handleSignOut = () =>{
    signOut(auth)
    .then(() =>{
      setUser({});
    })
    .catch(error =>{
      setUser({});
    })
  }
  return (
    <div className="App">
      {/* {condition ? true : false} */}
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button> 
        </>
        
      }
        <h2>Name: {user.displayName}</h2>
        <p>I know your email address:{user.email}</p>
        <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;

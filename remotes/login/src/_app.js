import React from 'react';
import { useCookies } from 'react-cookie';
const App = () => {
  const [cookies, setCookie] = useCookies('role');
  setCookie('role', 'admin')


  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
      <h2>Remote App - Login</h2>
      <p>This is the login remote application.</p>
      <button onClick={() => { setUser('new user from remote') }}>Login</button>
    </div >
  )
};

export default App;

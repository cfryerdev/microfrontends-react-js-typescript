import { NavLink } from "react-router-dom";
import Layout from "../layout";
import { createContext } from "react";
import { useState } from "react";
const IndexPage = () => {

  const [user, setUser] = useState('');

  const update = () => {
    console.log('update')
  }
  return (
    <Layout>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">Home</li>
      </ol>
      <div className="jumbotron pt-4 pb-2">
        <h1 className="display-3 mb-4 mt-0">Welcome</h1>
        <div className="lead">
          This is an example application using nextjs as a host, and create react application
          as remotes. These are dynamically resolved in each next page route, and defined either
          ssr true/false.
        </div>
        <div className="mt-4 mb-4">
          Check out remotes here: <br /><br />
          <div>• <NavLink to="/dashboard">Dashboard Remote App (React - Host Layout)</NavLink></div>
          <div>• <NavLink to="/sample/47">Sample Remote App (React - Host Layout)</NavLink></div>
          <div>• <NavLink to="/profile">Profile Remote App (Typescript - Remote Layout)</NavLink></div>
          <div>• <NavLink to="/example">Example App (Local Page)</NavLink></div>
          <div>• <NavLink to="/login">Login</NavLink></div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage;
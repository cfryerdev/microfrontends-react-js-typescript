import { NavLink } from "react-router-dom";
import Layout from "../../layout";

const ExamplePage = () => {
  return (
    <Layout>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item active">Example</li>
      </ol>
      Example page in the host, this is not a remote.
    </Layout>
  )
}

export default ExamplePage;
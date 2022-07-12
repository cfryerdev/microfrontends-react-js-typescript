import React, { useContext } from "react";
import Error from "./components/error/error";
import Layout from "./components/layout";

const App = () => {
	return (
		<Layout>
			<ol className="breadcrumb">
				<li className="breadcrumb-item">Home</li>
				<li className="breadcrumb-item active">Profile</li>
			</ol>
			<h2>Remote App - Profile</h2>
			<p>This is the profile remote application.</p>
			<Error />
		</Layout>
	);
}

export default App;

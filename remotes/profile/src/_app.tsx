import React, { useContext } from "react";
import Layout from "./components/layout";
import AppLogger from '@shared/utilities/AppLogger';
const App = () => {
	const logExample = () => {
		const error = new Error();
		AppLogger.logException(error);
	}
	return (
		<Layout>
			<ol className="breadcrumb">
				<li className="breadcrumb-item">Home</li>
				<li className="breadcrumb-item active">Profile</li>
			</ol>
			<h2>Remote App - Profile</h2>
			<p>This is the profile remote application.</p>
			<button onClick={() => logExample()}>Logging</button>

		</Layout>
	);
}

export default App;

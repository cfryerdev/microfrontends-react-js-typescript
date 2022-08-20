import React, { useContext } from "react";
import Error from "./components/error/error";
import Layout from "./components/layout";
import AppLogger from '@shared/utilities/AppLogger';
const App = () => {
	const logExample = () => {
		//@ts-ignore
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
			<Error />
			<button onClick={() => logExample()}>Logging</button>

		</Layout>
	);
}

export default App;

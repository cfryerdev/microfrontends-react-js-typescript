import React, { useContext } from "react";
import { AccountProvider, AccountContext } from "@shared/contexts/account-context";
import Layout from "./components/layout";

const LoginButton = () => {
	const context = useContext(AccountContext);
	const handleClick = () => {
		console.log('logging in...');
		context.login('cfryerdev', 'cfryerdev@gmail.com');
	};
	return <button onClick={handleClick}>Login</button>
};

const LogoutButton = () => {
	const context = useContext(AccountContext);
	const handleClick = () => {
		context.logout();
	};
	return <button onClick={handleClick}>Logout</button>
};

const App = () => {
	return (
		<AccountProvider>
			<Layout>
				<ol className="breadcrumb">
					<li className="breadcrumb-item">Home</li>
					<li className="breadcrumb-item active">Profile</li>
				</ol>
				<h2>Remote App - Profile</h2>
				<p>This is the profile remote application.</p>
				<LoginButton />{' '}
				<LogoutButton />
			</Layout>
		</AccountProvider>
	);
}

export default App;

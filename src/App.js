import React from 'react';
import './App.css';
import './Home.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Error from './components/Error';
import Brokers from './components/Brokers';
import CustomNavbar from './components/CustomNavbar';
import Dashboard from './components/Dashboard';


function App() {

	return (
		<div>
			<CustomNavbar/>
			<Router>
				<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route path="/login" component={Login} />
				<Route path="/brokers" component={Brokers} />
				<Route component={Error} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

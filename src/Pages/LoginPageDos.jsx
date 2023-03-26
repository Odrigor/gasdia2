import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import NavBar from '../components/NavBar'



const LoginPageDos = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const {setUser, user} =  useContext(UserContext);

	const uri = import.meta.env.VITE_BACKEND_URL;

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(uri+"/login2", {
				username,
				password,
			})
			.then((res) => {
				//console.log(res);
				//console.log({user: res.data.user});
				console.log('Hasta aqui si funciona uwu')
				setUser(res.data.user)
				navigate('/Visualizacion')

			})
			.catch((err) => {
				// Handle the error
			});
	};

	return (
		<div className="login-dos">
			<NavBar></NavBar>
			<h1>Login Para analista de datos</h1>
			<form onSubmit={handleSubmit} className="form">
				<label className="form-label">
					Username
					
				</label>
				<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="form-input"
					/>
				<label className="form-label">
					Password
					
				</label>
				<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="form-input"
					/>
				<button type="submit" className="form-input">Login</button>
			</form>
		</div>
	);
};

export default LoginPageDos;
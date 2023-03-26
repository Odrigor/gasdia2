import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const {setUser, user} =  useContext(UserContext);

	const uri = import.meta.env.VITE_BACKEND_URL;

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(uri+"/api/login", {
				username,
				password,
			})
			.then((res) => {
				console.log('Hasta aqui si funciona uwu')
				console.log(res.data.user);
				setUser(res.data.user)
				navigate('/pedidos')

			})
			.catch((err) => {
				console.log(err)
			});
	};

	return (
		<div className="login">
			<h2 className="login-header">Log in</h2>
			<form onSubmit={handleSubmit} className="login-container">
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

export default LoginPage;
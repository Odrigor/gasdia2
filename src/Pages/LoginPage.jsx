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
		<div className="login-page">
			<div className="login">
			<div className="login-triangle"></div>
			<h2 className="login-header">Log in</h2>
			<form onSubmit={handleSubmit} className="login-container">
				<p><input type="text" placeholder="usuario(solo numeros)" value={username} onChange={(e) => setUsername(e.target.value)}></input></p>
				<p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input></p>
				<p><input type="submit" value="Log in"></input></p>
			</form>
		</div>
		</div>
	);
};

export default LoginPage;
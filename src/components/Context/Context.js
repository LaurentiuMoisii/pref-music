import React, { createContext, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext();
export const Context = (props) => {
	const message = 'Hello';
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({
		isAdmin: false,
		isLogged: false
	});

	const fetchItems = async () => {
		const newItems = [];
		const users = await axios.get('http://localhost:5000/users');
		if (users) {
			users.data.forEach(async (el, index) => {
				const resp = await axios.get(`http://localhost:5000/users/${el.id}/comments`);
				console.log(resp);
				if (resp) {
					newItems.push({ ...el, comments: [...resp.data]});
				}
				if (index === users.data.length - 1) {
					setUsers([ ...newItems ]);
				}
			});
		}
  };
 setTimeout(() => {
  fetchItems()
 }, 2000)

	const getUser = (email, password) => {
		return new Promise((resolve, reject) => {
			const filterUser = users.filter((obj) => {
				return obj.email === email;
			});
			console.log(filterUser);
			if (filterUser.length === 1) {
				setTimeout((cb) => {
					setUser({ ...filterUser[0], isLogged: true });
					resolve();
				}, 1000);
			} else {
				reject();
			}
		});
	};

	const addUsersHandler = (name, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post('http://localhost:5000/users', {
					name,
					password
				})
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
  };
  

	const loginHandler = (name, password) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`http://localhost:5000/users?name=${name}&password=${password}`)
				.then((res) => {
					resolve(res);
					console.log(res.data);
					setUser({ isLogged: true, ...res.data[0] });
				})
				.catch((err) => {
					reject(err);
				});
		});
	};
	const addCommentHandler = (body) => {
		return new Promise((resolve, reject) => {
			axios
				.post('http://localhost:5000/comments', {
          userId: user.id ,
          body
				})
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};
	return (
		<StoreContext.Provider value={{ message, users, fetchItems, getUser, user, addUsersHandler, loginHandler, addCommentHandler }}>
			{props.children}
		</StoreContext.Provider>
	);
};

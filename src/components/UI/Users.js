import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../Context/Context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Button, TextField } from '@material-ui/core';

function Users() {
	

	const [ open, setOpen ] = React.useState(false);
	const [ user, setUser ] = useState({});
	const [comment, setComment] = useState('')
	const context = useContext(StoreContext);

	const useStyles = makeStyles((theme) => ({
		firstName: {
			backgroundColor: '#9a9a9a'
		},
		secondName: {
			backgroundColor: '#c0c0c0'
		},
		root: {
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			alignItems: 'center'
		},
		items: {
      maxWidth: 600,
      minWidth: 550,
			backgroundColor: '#ccc',
			borderRadius: 10,
			marginBottom: 20
		}
	}));

	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const moreDetail = (item) => {
		console.log(item);
		setUser(item);
		handleClickOpen();
	};
	useEffect(() => {
		context.fetchItems();
		//eslint-disable-next-line
	}, []);
	

	return (
		<div>
			<Navbar />
			<div className={classes.root}>
				{context.user.isAdmin ? 
				<>
						
					{context.users && context.users.map((item) => (
						<>	{item.comments.map(el => (
							<List >
							<ListItem key={item.id} className={classes.items}>
								<ListItemAvatar>
									<Avatar src={item.avatar} />
								</ListItemAvatar>
								<ListItemText primary={`${item.name}`} />
								<ListItemText primary={el.body} />
								<ListItemSecondaryAction>
									{context.user.isAdmin && <IconButton onClick={() => moreDetail(item)} aria-label="delete" className={classes.margin}>
										<EditIcon />
									</IconButton>}
								</ListItemSecondaryAction>
							</ListItem>
							</List>
								
							))}</>
					
					))}
				
				</>
		 : <>
				<TextField value={comment} label='Your comment' onChange={(e) => setComment(e.target.value)} />
				<Button onClick={() => context.addCommentHandler(comment)}>Add</Button>
				</>}
			</div>
		</div>
	);
}

export default Users;

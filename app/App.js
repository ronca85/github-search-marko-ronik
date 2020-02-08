import React, { useState, useEffect } from "react"
import { Form, Card, Image, Icon } from "semantic-ui-react"

function App () {

	const [name, setName] = useState("");
	const [userName, setUsername] = useState("");
	const [followers, setFollowers] = useState("");
	const [following, setFollowing] = useState("");
	const [repos, setRepos] = useState("");
	const [avatar, setAvatar] = useState("");
	const [userInput, setUserInput] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`https://api.github.com/users/reactjs`)
			.then(res => res.json())
			.then(data => {
				// console.log(data);
				setData(data);
			});
	}, []);

	const setData = ({
		name,
		login,
		followers,
		following,
		public_repos,
		avatar_url
	}) => {
		setName(name);
		setUsername(login);
		setFollowers(followers);
		setFollowing(following);
		setRepos(public_repos);
		setAvatar(avatar_url);
	};

	const handleSearch = (e => {
		setUserInput(e.target.value)
	});

	const handleSubmit = () => {
		fetch(`https://api.github.com/users/${userInput}`)
			.then(res => res.json())
			.then(data => {
				if (data.message) {
					setError(data.message)
				}
				else {
					setData(data);
					// console.log(data);
					setError(null);
				}
			});
	}

	return (
		<div>
			<div className="navbar">
				<div className="container">
					Github search
				</div>
			</div>
			<div className="search">
				<div className="container">
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Input placeholder="Name" name="name" onChange={handleSearch} />
							<Form.Button content="Submit" />
						</Form.Group>
					</Form>
				</div>
			</div>
			{ error ? (
			<div className="container">
				<h1>{error}</h1>
			</div>
			) : (
			<div className="card">
				<div className="container">
					<Card>
						<Image
							src={avatar}
							wrapped
							ui={false} />
						<Card.Content>
							<Card.Header>{name}</Card.Header>
							<Card.Header>{userName}</Card.Header>
						</Card.Content>
						<Card.Content extra>
						<a>
							<Icon name='user' />
							{followers} followers
						</a>
						</Card.Content>
						<Card.Content extra>
						<a>
							<Icon name='user' />
							{repos} repos
						</a>
						</Card.Content>
						<Card.Content extra>
						<a>
							<Icon name='user' />
							{following} following
						</a>
						</Card.Content>
					</Card>
				</div>
			</div>
			)}
		</div>
	)
}

export default App
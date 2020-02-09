import React, { useState, useEffect } from "react"
import { Form, Card, Image, Icon, List } from "semantic-ui-react"

function App () {

	const [name, setName] = useState("");
	const [userName, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [followers, setFollowers] = useState("");
	const [following, setFollowing] = useState("");
	const [repos, setRepos] = useState("");
	const [avatar, setAvatar] = useState("");
	const [githubUrl, setGithubUrl] = useState("");
	const [userInput, setUserInput] = useState("");
	const [error, setError] = useState(null);
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch(`https://api.github.com/users/reactjs`)
			.then(res => res.json())
			.then(data => {
				setData(data);
			});
	}, []);

	const setData = ({
		name,
		login,
		email,
		followers,
		following,
		public_repos,
		avatar_url,
		html_url
	}) => {
		setName(name);
		setUsername(login);
		setEmail(email);
		setFollowers(followers);
		setFollowing(following);
		setRepos(public_repos);
		setAvatar(avatar_url);
		setGithubUrl(html_url);
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
					console.log(data);
					setError(null);
				}
			});
		setItems([]);
	}

	const getRepoList = () => {
		fetch(`https://api.github.com/users/${userInput}/repos`)
			.then(res => res.json())
			.then(data => {
				// console.log("get repos", data);
				setItems([...data, { name: data.name, id: data.id }]);
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
							<Form.Input placeholder="search github username" name="name" onChange={handleSearch} />
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
							<Card.Header>{email}</Card.Header>
							<Card.Header as='a' href={githubUrl}>{githubUrl}</Card.Header>
						</Card.Content>
						<Card.Content extra>
						<a>
							<Icon name='user' />
							{followers} followers
						</a>
						</Card.Content>
						<Card.Content extra>
						<a onClick={getRepoList}>
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
			<div className="repo-list">
				<div className="container">
					<List>
						{items.map((item, i) => {
							return (
								<List.Item key={i}>
									<List.Icon name='github' size='large' verticalAlign='middle' />
									<List.Content>
										<List.Header as='a' href={item.html_url}>{item.name}</List.Header>
										<List.Description>{item.description}</List.Description>
									</List.Content>
								</List.Item>
							);
						})}
					</List>
				</div>
			</div>
		</div>
	)
}

export default App
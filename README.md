<p align="center">
	<a href="https://www.github.com/ronca85/github-search-marko-ronik/">View on github</a>
</p>
<h1 align="center">Github search</h1>
<p align="center">Search for a github profile by username and display the associated repo list</p>

## Installation

```sh
npm install
```

## Start project

```sh
npm run start
```

## What was added by me

```js
const getRepoList = () => {
	fetch(`https://api.github.com/users/${userInput}/repos`)
		.then(res => res.json())
		.then(data => {
			// console.log("get repos", data);
			setItems([...data, { name: data.name, id: data.id }]);
		});
}
```

```js
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
```

## Notes

Large portions of the code used in this assignment were copied from the web. Apart from debugging a few things the only thing that was added by me is shown in the area above. The rest of the code in the assignment was put together from a few different sources. It works but I am not happy with what it does.
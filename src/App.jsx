import './assets/css/tailwind.css'

import React, { useEffect, useState } from 'react';

function App() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/astro0725/repos', {
          headers: {
            'Authorization': `token ${import.meta.env.VITE_GITHUB_PAT}`, // Use Vite's environment variable syntax
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setRepos(data); // Set the fetched repos to state
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <div>
      <h1>GitHub Repos</h1>
      {error && <p>{error}</p>}
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

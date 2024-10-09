import React, { useEffect, useState } from 'react';

function App() {
  const [repos, setRepos] = useState([]); // state to store repositories
  const [error, setError] = useState(null); // state to store error message

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        // fetch user repos from github api
        const response = await fetch(`https://api.github.com/users/astro0725/repos`, {
          headers: {
            'Authorization': `token ${import.meta.env.VITE_GITHUB_PAT}`, // use environment variable for github token
            'Accept': 'application/vnd.github.v3+json', // specify github api version
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`); // handle error if response not ok
        }

        const data = await response.json(); // parse response json data

        // filter out specific repos if needed (example for the 'astro0725' user)
        const excludedRepos = ['will-you', 'portfolio-2.0', 'student-portfolio-css', 'astro0725', 'PixelPals', 'prework-study-guide', 'horiseon-refactor-challenge'];
        const filteredData = data.filter(repo => !excludedRepos.includes(repo.name));

        setRepos(filteredData); // set repositories to state
      } catch (error) {
        setError(error.message); // set error message if any error occurs
      }
    };

    fetchGitHubRepos(); // call the fetch function
  }, []); // empty dependency array means this effect runs once on component mount

  return (
    <div>
      <h1>GitHub Repos</h1>
      {error && <p>{error}</p>} {/* display error if there's any */}
      <ul>
        {repos.map(repo => ( // map over repositories and display each repo
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
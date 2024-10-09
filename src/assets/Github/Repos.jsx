import React, { useEffect, useState } from 'react';
import { fetchGitHubRepos } from './Fetch'; // import fetchGitHubRepos from Fetch.jsx

function GitHubRepos() {
  const [repos, setRepos] = useState([]); // state to store repositories
  const [error, setError] = useState(null); // state to store error message

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // get GitHub PAT from environment variables
        const token = import.meta.env.VITE_GITHUB_PAT;

        // fetch user repos from github using fetchGitHubRepos function
        const data = await fetchGitHubRepos('astro0725', [], token);

        // filter out specific repos
        const excludedRepos = [
          'will-you',
          'portfolio-2.0',
          'student-portfolio-css',
          'astro0725',
          'PixelPals',
          'prework-study-guide',
          'horiseon-refactor-challenge'
        ];
        const filteredData = data.filter((repo) => !excludedRepos.includes(repo.name));

        setRepos(filteredData); // set repositories to state
      } catch (error) {
        setError(error.message); // set error message if any error occurs
      }
    };

    fetchRepos(); // call the fetch function
  }, []); // empty dependency array means this effect runs once on component mount

  return (
    <div>
      <h1>GitHub Repos</h1>
      {error && <p>{error}</p>} {/* display error if there's any */}
      <ul>
        {repos.map((repo) => ( // map over repositories and display each repo
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GitHubRepos;

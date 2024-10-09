import { fetchGitHubRepos } from './Fetch'; // import the fetch function from Fetch.jsx

// function to fetch and filter specific repos for a user
export const getFilteredRepos = async (user) => {
  try {
    const token = import.meta.env.VITE_GITHUB_PAT; // fetch the token from env variables

    // fetch the repos for the user using the function from Fetch.jsx
    const repos = await fetchGitHubRepos(user, [], token);

    // filter out specific repos
    const excludedRepos = [
      'will-you',
      'portfolio-2.0',
      'student-portfolio-css',
      'astro0725',
      'prework-study-guide',
      'horiseon-refactor-challenge',
    ];

    // return the filtered repos
    return repos.filter((repo) => !excludedRepos.includes(repo.name));
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
};

// function to fetch specific repositories for a user
export const getSpecificRepo = async (user, repos) => {
  const token = import.meta.env.VITE_GITHUB_PAT; // Retrieve your GitHub PAT from environment variables
  try {
    const fetchedRepos = await Promise.all(
      repos.map(async (repo) => {
        const response = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
          headers: {
            'Authorization': `token ${token}`, // Use the token to authenticate
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (!response.ok) throw new Error(`Failed to fetch ${repo} from ${user}: ${response.statusText}`);
        return await response.json();
      })
    );
    return fetchedRepos;
  } catch (error) {
    console.error('Error fetching specific repos:', error);
    return [];
  }
};
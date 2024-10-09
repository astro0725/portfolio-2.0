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
      'PixelPals',
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
// function to fetch repos from github
export const fetchGitHubRepos = async (user, specificRepos = []) => {
  const token = import.meta.env.VITE_GITHUB_PAT;
  try {
    let url = `https://api.github.com/users/${user}/repos`;
    if (specificRepos.length > 0) {
      url += `?repos=${specificRepos.join(',')}`;
    }
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`, // use environment variable for GitHub token
        'Accept': 'application/vnd.github.v3+json', // specify GitHub API version
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    return await response.json(); // return parsed repos
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
};

// function to fetch README content from a repository
export const fetchReadme = async (fullName) => {
  const token = import.meta.env.VITE_GITHUB_PAT;
  try {
    const [user, repoName] = fullName.split('/');
    const response = await fetch(`https://api.github.com/repos/${user}/${repoName}/readme`, {
      headers: { 
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github+json' 
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch README: ${response.statusText}`);
      return {};
    }
    return await response.json(); // return readme data
  } catch (error) {
    console.error('Error fetching README:', error);
    return {};
  }
};

// function to extract and transform image URL from README content
export const transformImageUrl = (readmeContent, fullName) => {
  const imageUrlMatch = readmeContent.match(/\!\[.*?\]\((.*?)\)/); // extract image URL
  const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;
  if (imageUrl && !imageUrl.startsWith('http')) {
    const [user, repoName] = fullName.split('/');
    return `https://raw.githubusercontent.com/${user}/${repoName}/main/${imageUrl}`;
  } else {
    return imageUrl || '/placeholder.png'; // return placeholder if no image
  }
};
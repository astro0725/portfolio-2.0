import React, { useState, useEffect } from 'react';
import { getFilteredRepos, getSpecificRepo } from '../../assets/Github/Repos'; // use the function from repos.jsx
import { fetchReadme, transformImageUrl } from '../../assets/Github/Fetch'; // additional utilities from fetch.jsx

const Projects = () => {
  const [repos, setRepos] = useState({ featured: [], collaborations: [], practice: [] }); // renamed other to practice
  const [selectedCategory, setSelectedCategory] = useState('Featured'); // set the default category to 'Featured'
  const [filteredProjects, setFilteredProjects] = useState([]); // state to hold filtered repos for display

  const featuredRepoNames = ['GamifyLife', 'spawn-point-2.0']; // predefined list of featured repos
  const groupRepoNames = { 'stevendreed': ['3600'], 'SnapperGee': ['bookworm'] }; // predefined group repos by users

  useEffect(() => {
    const initializeRepos = async () => {
      // fetch featured repos
      const myRepos = await getFilteredRepos('astro0725'); // fetch featured repositories using getFilteredRepos

      // fetch group repos (now called collaborations)
      const groupReposPromises = Object.entries(groupRepoNames).map(async ([user, repos]) => {
        return getSpecificRepo(user, repos); // fetch only the specific repos for each user
      });
      const groupReposResults = (await Promise.all(groupReposPromises)).flat(); // flatten the group repos array
      // combine featured and group repos
      const allFetchedRepos = [...myRepos, ...groupReposResults];

      // fetch readme content and transform image url for each repo
      const reposWithImages = await Promise.all(
        allFetchedRepos.map(async (repo) => {
          const readmeData = await fetchReadme(repo.full_name); // fetch readme for each repo
          if (Object.keys(readmeData).length === 0) {
            return { ...repo, imageUrl: '/placeholder.png' }; // if no readme, return placeholder image
          }

          const readmeContent = atob(readmeData.content); // decode readme content from base64
          const fullImageUrl = transformImageUrl(readmeContent, repo.full_name); // get the image url from readme

          return { ...repo, imageUrl: fullImageUrl }; // return repo with image url added
        })
      );

      // categorize repos into featured, collaborations, and practice
      let featuredRepos = [],
        collaborationsRepos = [], // changed groupRepos to collaborationsRepos
        practiceRepos = [];

      reposWithImages.forEach((repo) => {
        const repoName = repo.name;
        if (featuredRepoNames.includes(repoName)) {
          featuredRepos.push(repo); // push to featured if repo name is in featuredRepoNames
        } else if (Object.values(groupRepoNames).flat().includes(repoName)) {
          collaborationsRepos.push(repo); // push to collaborations if repo name is in groupRepoNames
        } else {
          practiceRepos.push(repo); // push to practice if repo name is not in featured or collaborations
        }
      });

      setRepos({
        featured: featuredRepos, // set categorized repos to state
        collaborations: collaborationsRepos, // renamed group to collaborations
        practice: practiceRepos, // renamed other to practice
      });

      // set the filtered projects to the "Featured" repos by default
      setFilteredProjects(featuredRepos);
    };

    initializeRepos(); // fetch and initialize repos on mount
  }, []); // empty dependency array to run once

  // render projects based on category filter
  const renderProjects = (projectsArray) => {
    return (
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 space-between justify-center">
          {projectsArray.map((repo) => (
            <li key={repo.id} className="relative p-2 m-5 bg-body rounded-lg shadow-sm z-1">
              <div className="relative">
                <figure className="overflow-hidden rounded-md">
                  {repo.imageUrl && (
                    <img
                      src={repo.imageUrl}
                      alt={`${repo.name} screenshot`}
                      className="w-full h-3/4 object-cover"
                    />
                  )}
                </figure>
                <div className="text-center text-white">
                  <h4 className="font-medium text-primary text-lg">{repo.name}</h4>
                  <p className="text-xs">{repo.description}</p>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-highlight text-xs">
                    View on GitHub
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // handle category filtering
  const handleFilterClick = (category) => {
    setSelectedCategory(category); // update selected category

    const allReposWithCategory = [
      ...repos.featured.map((repo) => ({ ...repo, category: 'Featured' })), // map featured repos
      ...Object.entries(groupRepoNames).flatMap(([user, repoNames]) => {
        return repoNames.flatMap((repoName) => {
          const foundRepo = repos.collaborations.find(
            (repo) => repo.name === repoName && repo.owner.login === user // find matching collaborations repo
          );
          return foundRepo ? { ...foundRepo, category: 'Collaborations' } : []; // if found, assign to collaborations
        });
      }),
      ...repos.practice.map((repo) => ({ ...repo, category: 'Practice' })), // map practice repos
    ];

    const filtered = allReposWithCategory.filter((repo) => repo.category === category); // filter repos by selected category
    setFilteredProjects(filtered); // set filtered projects
  };

  return (
    <div data-page="portfolio">
      <header>
        <h2 className="text-highlight text-xl font-bold">What I'm Working On</h2>
      </header>

      <ul className="flex justify-center items-center gap-6 pl-1 mb-5 text-white">
        {['Featured', 'Collaborations', 'Practice'].map((category) => ( // Changed 'Other' to 'Practice'
          <li className="text-white transition-colors duration-300 hover:text-secondary" key={category}>
            <button
              className={category === selectedCategory ? 'text-secondary' : ''} // highlight selected category
              onClick={() => handleFilterClick(category)} // filter projects by category
              data-filter-btn
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      {renderProjects(filteredProjects)} {/* display filtered projects */}
    </div>
  );
};

export default Projects;
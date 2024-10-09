import React, { useState, useEffect } from 'react';
import { getFilteredRepos } from '../assets/Github/Repos'; // use the function from repos.jsx
import { fetchReadme, transformImageUrl } from '../assets/Github/Fetch'; // additional utilities from fetch.jsx

const Projects = () => {
  const [repos, setRepos] = useState({ personal: [], group: [], other: [] }); // state to hold categorized repos
  const [selectedCategory, setSelectedCategory] = useState('All'); // state to track selected filter category
  const [filteredProjects, setFilteredProjects] = useState([]); // state to hold filtered repos for display

  const personalRepoNames = ['GamifyLife', 'spawn-point-2.0']; // predefined list of personal repos
  const groupRepoNames = { 'stevendreed': ['3600'], 'SnapperGee': ['bookworm'] }; // predefined group repos by users

  useEffect(() => {
    const initializeRepos = async () => {
      // fetch personal repos
      const myRepos = await getFilteredRepos('astro0725'); // fetch personal repositories using getfilteredrepos

      // fetch group repos
      const groupReposPromises = Object.entries(groupRepoNames).map(async ([user, repos]) => {
        return Promise.all(repos.map(repo => getFilteredRepos(user, [repo]))); // fetch group repos using getfilteredrepos for each user
      });
      const groupReposResults = (await Promise.all(groupReposPromises)).flat(2); // flatten the group repos array

      const allFetchedRepos = [...myRepos, ...groupReposResults]; // combine personal and group repos

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

      // categorize repos into personal, group, and other
      let personalRepos = [],
        groupRepos = [],
        otherRepos = [];

      reposWithImages.forEach((repo) => {
        const repoName = repo.name;
        if (personalRepoNames.includes(repoName)) {
          personalRepos.push(repo); // push to personal if repo name is in personalRepoNames
        } else if (Object.values(groupRepoNames).flat().includes(repoName)) {
          groupRepos.push(repo); // push to group if repo name is in groupRepoNames
        } else {
          otherRepos.push(repo); // push to other if repo name is not in personal or group
        }
      });

      setRepos({
        personal: personalRepos, // set categorized repos to state
        group: groupRepos,
        other: otherRepos,
      });
      setFilteredProjects([...personalRepos, ...groupRepos, ...otherRepos]); // initially show all repos
    };

    initializeRepos(); // fetch and initialize repos on mount
  }, []); // empty dependency array to run once

  // render projects based on category filter
  const renderProjects = (projectsArray) => {
    return (
      <div>
        <ul className="grid grid-cols-2 space-between justify-center">
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
      ...repos.personal.map((repo) => ({ ...repo, category: 'Personal' })), // map personal repos
      ...Object.entries(groupRepoNames).flatMap(([user, repoNames]) => {
        return repoNames.flatMap((repoName) => {
          const foundRepo = repos.group.find(
            (repo) => repo.name === repoName && repo.owner.login === user // find matching group repo
          );
          return foundRepo ? { ...foundRepo, category: 'Group' } : []; // if found, assign to group
        });
      }),
      ...repos.other.map((repo) => ({ ...repo, category: 'Other' })), // map other repos
    ];

    if (category === 'All') {
      setFilteredProjects(allReposWithCategory); // show all repos if "all" is selected
    } else {
      const filtered = allReposWithCategory.filter((repo) => repo.category === category); // filter repos by selected category
      setFilteredProjects(filtered); // set filtered projects
    }
  };

  return (
    <section data-page="portfolio">
      <header>
        <h2 className="text-highlight text-xl font-bold">Portfolio</h2>
      </header>

      <ul className="flex justify-start items-center gap-6 pl-1 mb-5 text-white">
        {['Personal', 'Group', 'Other', 'All'].map((category) => (
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
    </section>
  );
};

export default Projects;
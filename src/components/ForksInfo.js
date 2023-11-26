import React, { useEffect, useState } from "react";
import { sortForks } from "../helpers";

const ForksInfo = ({ forksURL }) => {
  const [forks, setForks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!forksURL) return;

    const fetchForks = async () => {
      try {
        const response = await fetch(forksURL);
        if (!response.ok) {
          throw new Error('Error fetching gist details.');
        }
        const data = await response.json();
        setForks(sortForks(data).slice(0,3));
        setError(null);
      } catch (err) {
        setForks(null);
        setError(err.message);
      }
    };

    fetchForks();
  }, [forksURL]);

  return (
    <>
      {error && <span className='error'>{error}</span>}
      <h5>Number of Forks: <strong>{forks ? forks?.length : 'loading'}</strong></h5>
      <h5>Oldest Forks</h5>
      <div className="forks-container">
        {forks?.map(fork => (
          <div className="fork" key={fork.id}>
            <div className="owner">
              <img src={fork.owner.avatar_url} alt="Fork user avatar" className="avatar" />
              <div className="details">
                <p>{fork.owner.login}</p>
                <p>{fork.created_at}</p>
              </div>
            </div>
            <a href={fork.html_url} target="_blank" rel="noreferrer">{fork.description}</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default ForksInfo;
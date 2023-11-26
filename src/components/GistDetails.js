import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ForksInfo from "./ForksInfo";
import Badge from "./utils/Badge";
import { formatBytes, getBadgeContent, getBadges } from "../helpers";

const GistDetails = () => {
  const [gist, setGist] = useState(null);
  const [error, setError] = useState(null);
  const { gistId } = useParams();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        if (!response.ok) {
          throw new Error('Unable to fetch gist details.');
        }
        const data = await response.json();
        setGist(data);
        setError(null);
      } catch (err) {
        setGist(null);
        setError(err.message);
      }
    };

    fetchGist();
  }, [gistId]);

  useEffect(() => {
    if (gist) {
      setFiles(Object.values(gist.files));
    }
  }, [gist]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!gist) {
    return <p>Fetching gist details...</p>;
  }

  return (
    <div className="gist-details">
      <h1>Gist Details - {gist.description || 'No description'}</h1>
      <h2>Forks</h2>
      <ForksInfo forksURL={gist?.forks_url} />
      <h2>Languages</h2>
      {getBadges(files)}
      <h2>Files</h2>
      <div className="files-container">
        {files.map(file => (
          <div className="file-details" key={file.filename}>
            <p>
              <strong>{file.filename}</strong>
              <small className="size">{formatBytes(file.size)}</small>
            </p>
            <Badge>{getBadgeContent(file)}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GistDetails;
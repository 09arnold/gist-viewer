import React from "react";
import { Link } from "react-router-dom";
import { getBadgeContent, getBadges } from "../helpers";

const GistSummary = ({ gist }) => {
  const files = Object.values(gist.files);

  const languages = Array.from(
    new Set(files.map(file => getBadgeContent(file)))
  );

  console.log({ gist, files, languages })
  return (
    <Link to={`/gist/${gist.id}`} className="gist" key={gist.id}>
      <strong>{gist.description || 'No description available'}</strong>
      <p>File: <strong>{files?.[0].filename}</strong></p>
      <p>Files: {files?.length}</p>
      {getBadges(files)}
    </Link>
  )
};

export default GistSummary;
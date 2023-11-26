import React from "react";
import GistSummary from "./GistSummary";

const GistList = ({ gists }) => {

  return (
    <div className="gist-list">
      <h1>{gists?.length ? 'Gists': 'No gists to display'}</h1>
      {gists.map(gist => <GistSummary gist={gist} key={gist.id} />)}
    </div>
  );
};

export default GistList;
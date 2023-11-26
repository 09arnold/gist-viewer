import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GistList from './components/GistList';
import GistDetails from './components/GistDetails';
import Pagination from './components/utils/Pagination';
import './App.scss';

function App() {
  const [gistUsername, setGistUsername] = useState('');
  const [gists, setGists] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const handleGistUsernameChange = (event) => {
    if (error) {
      setError(null);
    }
    setGistUsername(event.target.value);
  };

  const getGistsForUser = async (page) => {
    if (!gistUsername) return;
    try {
      const response = await fetch(`https://api.github.com/users/${gistUsername}/gists?page=${page}&per_page=5`);
      if (!response.ok) {
        throw new Error('User not found or unable to fetch gists.');
      }
      const data = await response.json();
      setGists(data);
      setError(null);
    } catch (err) {
      setGists([]);
      setError(err.message);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!gistUsername) {
      setGists([]);
      return;
    }
    setPage(1);
    await getGistsForUser(page);
  };

  useEffect(() => {
    getGistsForUser(page);
  }, [page]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path='/' element={
            <>
              <form onSubmit={handleFormSubmit}>
                <label>
                  GitHub Username:
                  <input type="text" value={gistUsername} onChange={handleGistUsernameChange} data-testid='username-input'/>
                  {error && <span className='error'>{error}</span>}
                </label>
              </form>
              <GistList gists={gists} />
              <Pagination currentPage={page} onPageChange={setPage} disableNext={!gists?.length} />
            </>
          }
          />
          <Route path='/gist/:gistId' element={<GistDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

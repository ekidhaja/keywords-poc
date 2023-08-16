import React, { useState, useEffect } from 'react';
import Admin from './components/Admin';
import BO from './components/BO';

export const baseURL = 'http://localhost:4000';
const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ userId: string, type: string, name: string, tenantId: string } | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${baseURL}/all-users`)
      .then(res => res.json())
      .then(data => setUsers(data));

      // Check if there's a userId in the URL and set it as the loggedInUser
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('userId');
    if (userIdFromUrl) {
      const user = users.find(u => u.userId === userIdFromUrl);
      if (user) setLoggedInUser(user);
    }
  }, [users]);

  const handleLogin = () => {
    const user = users.find(u => u.userId === selectedUserId);
    if (user) {
      setLoggedInUser(user);

      // Update the URL with the user's userId
      window.history.pushState(null, '', `?userId=${user.userId}`);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    window.history.pushState({}, '', '/'); // remove userId from URL
  };

  if (loggedInUser) {
    return (
      <div className="container">
        {loggedInUser.type === 'BO' && <BO tenantId={loggedInUser.tenantId} />}
        {loggedInUser.type === 'BSO Admin' && <Admin tenantId={loggedInUser.tenantId} />}
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="container">
      <select onChange={e => setSelectedUserId(e.target.value)}>
        <option value="">Select a user...</option>
        {users.map(user => (
          <option key={user.userId} value={user.userId}>
            {`${user.name}-${user.tenantId}`}
          </option>
        ))}
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;

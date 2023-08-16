import React, { useState, useEffect } from 'react';
import { baseURL } from '../App';

interface IProps {
    tenantId: string;
}
const Admin: React.FC<IProps> = ({ tenantId }) => {
  const [keywords, setKeywords] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`${baseURL}/keywords/${tenantId}`)
      .then(res => res.json())
      .then(data => setKeywords(data.keywords));
  }, [tenantId]);

  const handleUpdate = () => {
    fetch(`${baseURL}/keywords/${tenantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ keywords })
    })
    .then(res => res.json())
    .then((data: any) => {
        setStatus(data?.message)
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="admin-content container">
        <div style={{color: 'green'}}>{status}</div>
        <h1>BSO Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Edit Keywords</p>
      {Object.keys(keywords).map(key => (
        <div key={key}>
          <label>{key}:</label>
          <input value={keywords[key]} onChange={e => setKeywords(prev => ({ ...prev, [key]: e.target.value }))} />
        </div>
      ))}
      <button onClick={handleUpdate}>Update Keywords</button>
    </div>
  );
}

export default Admin;

import React, { useState, useEffect } from 'react';
import { baseURL } from '../App';

interface IProps {
    tenantId: string;
}

const BO: React.FC<IProps> = ({ tenantId }) => {
  const [keywords, setKeywords] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch(`${baseURL}/keywords/${tenantId}`)
      .then(res => res.json())
      .then(data => setKeywords(data.keywords));
  }, [tenantId]);

  return (
    <div className="bo-content container">
      <h1>BO Dashboard</h1>
      <p>Welcome to the BO dashboard. Manage your operations here.</p>
      <p>Your {keywords.advisor || 'Advisor'} is here to help.</p>
      <p>Your {keywords.organization || 'Organization'} is fully supportive.</p>
    </div>
  );
}

export default BO;

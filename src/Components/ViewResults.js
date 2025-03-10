import React, { useEffect, useState } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

  useEffect(() => {
    const fetchResults = async () => {
      // Fetch election results from the blockchain
      const results = await suiClient.getObject({
        id: '0xYOUR_ELECTION_RESULT_OBJECT_ID',
        options: { showContent: true },
      });
      setResults(results.data.content.fields);
    };

    fetchResults();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Election Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">Candidate ID:</span> {result.candidate_id},{' '}
            <span className="font-semibold">Votes:</span> {result.total_votes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewResults;
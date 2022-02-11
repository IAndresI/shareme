import React, { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';

export default function Search({ searchTerm }) {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setPins(null);
    const timer = setTimeout(() => {
      if (searchTerm) {
        const query = searchQuery(searchTerm.toLowerCase());
        client.fetch(query)
          .then((data) => {
            setPins(data);
            setLoading(false);
          });
      } else {
        client.fetch(feedQuery)
          .then((data) => {
            setPins(data);
            setLoading(false);
          });
      }
    }, 500);

    return () => {
      setLoading(false);
      clearInterval(timer);
    };
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Search for pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setLoading(false);
          setPins(data);
        });
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setLoading(false);
          setPins(data);
        });
    }
  }, [categoryId]);

  if (loading) return <Spinner message="We are adding ideas to your feed" />;

  if (!pins?.length) return <h2 className="font-bold text-xl text-center mt-3">No Pins Aviable</h2>;

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  );
}

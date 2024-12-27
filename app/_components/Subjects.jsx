'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const getCategories = async (pageNumber) => {
    if (isLoading || !session?.token) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://exam.elevateegy.com/api/v1/subjects?limit=3&page=${pageNumber}`,
        {
          method: 'GET',
          headers: {
            token: session.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      
      if (!result.subjects.length) {
        setHasMore(false);
        return;
      }

      // Use a Set to ensure unique subjects based on _id
      setSubjects(prevSubjects => {
        const uniqueSubjects = new Set([...prevSubjects, ...result.subjects].map(s => JSON.stringify(s)));
        return Array.from(uniqueSubjects).map(s => JSON.parse(s));
      });
      
      setPage(pageNumber + 1);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle infinite scroll loading
  const loadMore = () => {
    if (!isLoading && hasMore) {
      getCategories(page);
    }
  };

  // Initial load
  useEffect(() => {
    if (session?.token && subjects.length === 0) {
      getCategories(1);
    }
  }, [session]);

  // Reset state when component unmounts or session changes
  useEffect(() => {
    return () => {
      setSubjects([]);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    };
  }, [session?.token]);

  return (
    <InfiniteScroll
      dataLength={subjects.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className='subjects flex flex-wrap gap-3'>
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className='subject-card w-full md:w-[31%]'
          >
            <Image
              src={subject.icon}
              alt={subject.name}
              width={500}
              height={300}
            />
            <h3>{subject.name}</h3>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default Subjects;
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useSession } from 'next-auth/react';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { ref, inView } = useInView();
  const { data } = useSession();
  // console.log(data);
  const getCategories = async (currentPage) => {
    // if (!hasMore || !session?.token) return;

    try {
      const response = await fetch(
        `https://exam.elevateegy.com/api/v1/subjects?limit=3&page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            token: data.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setNumberOfPages(result.metadata.numberOfPages);
      console.log(result);
      if (
        result.subjects.length === 0 ||
        currentPage > result.metadata.numberOfPages
      ) {
        setHasMore(false);
      } else {
        setSubjects((prevSubjects) => [...prevSubjects, ...result.subjects]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    // Only fetch if in view, we have more items, and current page is within total pages
    if (page <= numberOfPages && data) {
      if (subjects.length > 0 && page == 1) return;
      console.log(page);
      setHasMore(false);

      getCategories(page);
      console.log(inView);
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, page, numberOfPages, data, inView]);

  return (
    <div className='subjects flex flex-wrap gap-3'>
      {subjects.map((subject, index) => {
        // Attach ref only to the last item
        const isLastItem = index === subjects.length - 1;
        return (
          <div
            key={subject._id}
            ref={isLastItem ? ref : null}
            className='subject-card w-full lg:w-[31%]'
          >
            <Image
              src={subject.icon}
              alt={subject.name}
              width={500}
              height={300}
            />
            <h3>{subject.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Subjects;

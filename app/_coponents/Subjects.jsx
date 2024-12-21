'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { ref, inView } = useInView();
  const { data } = useSession();
  // console.log(data);
  const getCategories = async () => {
    // if (!hasMore || !session?.token) return;
setPage(page=>page+1)
    try {
      const response = await fetch(
        `https://exam.elevateegy.com/api/v1/subjects?limit=3&page=${page}`,
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
        page > result.metadata.numberOfPages
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
      // console.log(page);
      setHasMore(false);

      getCategories();
      console.log(inView);
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, page, numberOfPages, data, inView]);

  return (
   







<InfiniteScroll
  dataLength={2} //This is important field to render the next data
  next={getCategories}
  hasMore={hasMore}
  loader={<h4>Loading...</h4>}


>
<div className='subjects flex flex-wrap gap-3'>
{subjects.map((subject, index) => {
        // Attach ref only to the last item
        // const isLastItem = index === subjects.length - 1;
        return (
          <div
            key={subject._id}
            // ref={isLastItem ? ref : null}
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
        );
      })}
    </div>

</InfiniteScroll>





    
  );
}

export default Subjects;

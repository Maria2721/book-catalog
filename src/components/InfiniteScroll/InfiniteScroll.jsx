import { useEffect, useRef } from 'react';

const InfiniteScroll = ({ loadMore, hasMore, isLoading, children, threshold = 1.0 }) => {
  const loaderRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        threshold,
        rootMargin: '200px',
      },
    );

    const currentElement = loaderRef.current;
    if (currentElement) {
      observer.current.observe(currentElement);
    }

    return () => {
      if (observer.current && currentElement) {
        observer.current.unobserve(currentElement);
      }
    };
  }, [loadMore, hasMore, isLoading, threshold]);

  return (
    <div>
      {children}
      {hasMore && <div ref={loaderRef} style={{ height: '1px' }} />}
      {isLoading && <p>Загрузка...</p>}
    </div>
  );
};

export default InfiniteScroll;

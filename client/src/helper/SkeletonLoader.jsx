import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const SkeletonLoader = ({ item }) => {
  return (
    <SkeletonTheme
      baseColor="#ebebeb"
      highlightColor="#f5f5f5"
      className="w-100"
    >
      <div className="w-100 px-3">
        <Skeleton count={item} />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;

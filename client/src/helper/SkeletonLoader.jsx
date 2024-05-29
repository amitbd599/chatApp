import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const SkeletonLoader = ({ item }) => {
  return (
    <SkeletonTheme
      baseColor="#ebebeb"
      highlightColor="#f5f5f5"
      className="w-100vw"
    >
      <div className="">
        <Skeleton count={item} />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;

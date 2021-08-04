import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export default function LoadMore({ onGetPage }) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const products = useSelector((state) => state.product.products, shallowEqual);

  useEffect(() => {
    setResult(products?.length);
  });

  useEffect(() => {
    onGetPage(page);
  });

  return (
    <div className="load_more">
      {result < page * 9 ? (
        ''
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
}

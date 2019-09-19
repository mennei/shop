import React from 'react';
import Products from '../../src/fe/containers/Products/Products';
import {useRouter} from 'next/router';

const ProductsList = () => {
  const router = useRouter ();
  console.log (router);
  return <Products token={router.query.token} />;
};

export default ProductsList;

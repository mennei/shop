import React from 'react';
import * as Styled from '../../containers/Auth/StyledAuth';
import Link from 'next/link';

const product = props => {
  console.log (props);
  return (
    <Styled.Auth>
      {props.name}
      <div>
        מחיר: <strong>{Number.parseFloat (props.price).toFixed (2)} ש"ח</strong>
      </div>
      <Link href={{ pathname: '/products/[id]/product', query: { name: props.name, price: props.price, token: props.token, list: props.list } }}><a>דף פרטי מוצר</a></Link>
    </Styled.Auth>
  );
};

export default product;

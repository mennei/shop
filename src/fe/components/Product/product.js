import React from 'react';
import * as Styled from '../../containers/Auth/StyledAuth';

const product = props => {
  return (
    <Styled.Auth>
      {props.name}
      <div>
        מחיר: <strong>{Number.parseFloat (props.price).toFixed (2)} ש"ח</strong>
      </div>
    </Styled.Auth>
  );
};

export default product;

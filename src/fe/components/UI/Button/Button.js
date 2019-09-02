import React from 'react';

import * as Styled from './StyledButton.js';

const button = props => (
  <Styled.Button
    disabled={props.disabled}
    onClick={props.clicked}
    btnType={props.btnType}
  >
    {props.children}
  </Styled.Button>
);

export default button;

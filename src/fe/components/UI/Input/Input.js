import React from 'react';

import * as Styled from './StyledInput.js';

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <Styled.InputElementTypeInput
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <Styled.InputElementTypeTextarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <Styled.InputElementTypeSelect
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map (option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </Styled.InputElementTypeSelect>
      );
      break;
    default:
      inputElement = (
        <Styled.InputElementTypeInput
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <Styled.Input>
      <Styled.Label>{props.label}</Styled.Label>
      {inputElement}
    </Styled.Input>
  );
};

export default input;

import styled from 'styled-components';

export const Button = styled.button`
    background-color: transparent;
    border: none;
    color: ${props => (props.btnType == 'Success' ? '#5C9210' : props.btnType == 'Danger' ? '#944317' : 'white')};
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

    :first-of-type {
        margin-left: 0;
        padding-left: 0;
    }
    :disabled {
        color: #ccc;
        cursor: not-allowed;
    }
}`;

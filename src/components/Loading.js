
import React from 'react'
import styled, {keyframes} from 'styled-components';

const Loading = () => {
    return (
        <StyledLoading />
    )
}

const loaderAnim = keyframes`
    to {
		opacity: 1;
		transform: scale3d(0.5, 0.5, 1);
	}
`

const StyledLoading = styled.div`
    &::after,&::before{
        content: '';
        position: absolute;
        z-index: 1000;
    }
    &::before{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    &::after{
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        margin: -30px 0 0 -30px;
        border-radius: 50%;
        opacity: 0.4;
        background: var(--color-secondary);
        animation: ${loaderAnim} 0.7s linear infinite alternate forwards;
    }
`;




export default Loading
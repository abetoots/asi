import React from 'react';
import './PhotoIcon.scss';

import Aux from '../../../hoc/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PhotoIcon = (props) => {
    let render = '';
    render = props.src ?
        <img className={`PhotoIcon ${props.className ? props.className : null}`}
            src={props.src}
            alt={props.alt ? props.alt : null}
        /> :
        <FontAwesomeIcon icon={['fas', 'user']} size="2x" />;
    return (
        <Aux>
            {render}
        </Aux>
    );
};

export default PhotoIcon;
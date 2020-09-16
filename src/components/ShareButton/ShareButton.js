import React from 'react';
import './ShareButton.scss';

const ShareButton = (props) => {
    const visible = props.link ? '' : 'ShareButton-container__hidden';
    return (
        <div className={`ShareButton-container ${visible}`}>
            <p>Share the link to your friends!</p>
            <input type="text" value={props.link} readOnly/>
            <button>Copy Link</button>
        </div>
    )
};

export default ShareButton;
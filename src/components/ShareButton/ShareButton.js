import React from 'react';
import './ShareButton.scss';

const ShareButton = (props) => {
    const inputRef = React.createRef();
    const visible = props.link ? '' : 'ShareButton-container__hidden';

    const copyLink = () => {
        inputRef.current.select();
        document.execCommand('copy');
    }
    return (
        <div className={`ShareButton-container ${visible}`}>
            <p>Share the link to your friends!</p>
            <input ref={inputRef} type="text" value={props.link} readOnly/>
            <button onClick={copyLink}>Copy Link</button>
        </div>
    )
};

export default ShareButton;
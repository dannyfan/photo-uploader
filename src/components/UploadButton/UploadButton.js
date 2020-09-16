import React from 'react';

const UploadButton = (props) => {    

    const uploadImage = (event) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            props.setImage(event.target.result);
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <input type="file" className="Upload-Button" onChange={uploadImage}/>
    )
};

export default UploadButton;
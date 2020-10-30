import React from "react";
import "./UploadButton.scss";

const UploadButton = (props) => {
    const uploadImage = (event) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            props.setImage(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        props.setImageName(event.target.files[0].name);
        props.setImageType(event.target.files[0].type);
    };

    return (
        <label className="UploadButton_label">
            <input
                accept="image/png, image/jpeg"
                type="file"
                className="UploadButton"
                onChange={uploadImage}
            />
            Upload image
        </label>
    );
};

export default UploadButton;

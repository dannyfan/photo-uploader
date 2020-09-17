import React, { useEffect, useState } from "react";
import "./Viewer.scss";

const Viewer = (props) => {
    const [image, setImage] = useState("");
    const [valid, setValid] = useState(true);

    useEffect(() => {
        if (props.id) {
            getImage(props.id);
        }
    }, [props.id]);

    const getImage = (id) => {
        fetch(`/view/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data["url"]) {
                    setImage(data["url"]);
                } else {
                    setValid(false);
                }
            });
    };

    return (
        <div className="Viewer">
            <a href="/">Click here to return home</a>
            {valid ? (
                <img src={image} alt="" />
            ) : (
                <h1>Image not found!</h1>
            )}
        </div>
    );
};

export default Viewer;

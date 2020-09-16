import React, { useEffect, useState } from "react";

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
                console.log(data["url"]);
                if (data["url"]) {
                    setImage(data["url"]);
                } else {
                    setValid(false);
                }
            });
    };

    return (
        <div className="Viewer">
            {valid ? (
                <img src={image} alt="" />
            ) : (
                <h1>Image not found!</h1>
            )}
            <a href="/">Click here to return home</a>
        </div>
    );
};

export default Viewer;

import React, { useEffect, useState } from "react";
import Canvas from "../Canvas";
import FilterList from "../FilterList";
import UploadButton from "../UploadButton";
import ShareButton from "../ShareButton";
import Viewer from "../Viewer";
import "./App.scss";

const App = () => {
    const [rawImage, setRawImage] = useState("");
    const [filter, setFilter] = useState("grayscale");
    const [filterValue, setFilterValue] = useState(50);
    const [finalImage, setFinalImage] = useState("");
    const [shareLink, setShareLink] = useState("");
    const urlParams = new URLSearchParams(window.location.search);
    const viewId = urlParams.get("view");

    useEffect(() => {
        if (finalImage) {
            saveImage();
        }
    }, [finalImage]);

    const saveImage = () => {
        fetch("/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image: finalImage,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const url = `${window.location.href}?view=${data["id"]}`;
                setShareLink(url);
            });
    };

    return (
        <div className="App">
            {viewId ? (
                <Viewer id={viewId}/>
            ) : (
                <>
                    <UploadButton image={rawImage} setImage={setRawImage} />
                    <FilterList
                        setFilter={setFilter}
                        setFilterValue={setFilterValue}
                    />
                    <Canvas
                        image={rawImage}
                        filter={filter}
                        filterValue={filterValue}
                        setFinalImage={setFinalImage}
                    />
                    <ShareButton link={shareLink} />
                </>
            )}
        </div>
    );
};

export default App;

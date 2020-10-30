import React, { useEffect, useState } from "react";
import Canvas from "../Canvas";
import FilterList from "../FilterList";
import UploadButton from "../UploadButton";
import ShareButton from "../ShareButton";
import Viewer from "../Viewer";
import "./App.scss";


const App = () => {
    const [rawImage, setRawImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageType, setImageType] = useState("");
    const [filter, setFilter] = useState("greyscale");
    const [filterValue, setFilterValue] = useState(50);
    const [finalImage, setFinalImage] = useState("");
    const [startTransform, setStartTransform] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const urlParams = new URLSearchParams(window.location.search);
    const viewId = urlParams.get("id");

    const APIURL = process.env.REACT_APP_API_URL;
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        if (startTransform) {
            saveImage();
        }
    }, [startTransform]);

    useEffect(() => { getAPIKey()}, []);

    const getAPIKey = () => {
        fetch(APIURL+"/api")
        .then((response) => response.json())
        .then((data) => setApiKey(data.body['key']));
    }

    const dataURItoBlob = (dataURI) => {
        const binary = atob(dataURI.split(',')[1]);
        const array = [];
        for(let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }

    const uploadImage = (image1, image2) => {
        fetch(APIURL+`/upload?name=${imageName}&type=${imageType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const orginalBlob = dataURItoBlob(image1);
            const newBlob = dataURItoBlob(image2);
            fetch(data['o_url'], {
                method: "PUT",
                headers: {
                    "Content-Type": imageType,
                },
                body: orginalBlob
            });
            fetch(data['t_url'], {
                method: "PUT",
                headers: {
                    "Content-Type": imageType,
                },
                body: newBlob
            }).then(() => {
                const url = `${window.location.href}?id=${data["id"]}`;
                setShareLink(url);
            });
        });
    }

    const saveImage = () => {
        fetch(APIURL+"/transform", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
            body: JSON.stringify({
                image: rawImage,
                type: imageType,
                filter: filter,
                value: filterValue
            }),
        }).then((response) => response.json())
        .then((data) => {
            const body = JSON.parse(data.body);
            const image = body.image;
            setFinalImage(image);
            uploadImage(rawImage, image);
        }).catch((err) => {
            alert("Transformation failed");
        });
    };

    return (
        <div className="App">
            {viewId ? (
                <Viewer id={viewId} url={APIURL}/>
            ) : (
                <>
                    <UploadButton image={rawImage} 
                        setImage={setRawImage} 
                        setImageName={setImageName} 
                        setImageType={setImageType}
                    />
                    <ShareButton link={shareLink} />
                    <FilterList
                        setFilter={setFilter}
                        setFilterValue={setFilterValue}
                    />
                    <Canvas
                        image={rawImage}
                        finalImage={finalImage}
                        filter={filter}
                        filterValue={filterValue}
                        setStartTransform={setStartTransform}
                    />
                </>
            )}
        </div>
    );
};

export default App;

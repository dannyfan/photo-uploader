import React from 'react';
import './Canvas.scss';

const Canvas = (props) => {
    const canvasRef = React.createRef();
    const imageRef = React.createRef();

    const imageDraw = () => {
        const canvas = canvasRef.current;
        canvas.width = imageRef.current.width;
        canvas.height = imageRef.current.height;
        const ctx = canvas.getContext('2d');
        ctx.filter = `${props.filter}(${props.filterValue})`;
        ctx.drawImage(imageRef.current, 0, 0);
        props.setFinalImage(canvas.toDataURL('image/png'));
    }

    return (
        <div className='Canvas'>
            <canvas ref={canvasRef}></canvas>
            <img ref={imageRef} src={props.image} alt='' onLoad={imageDraw}/>
        </div>
    )
}

export default Canvas;
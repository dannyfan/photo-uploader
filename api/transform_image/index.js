const sharp = require('sharp');

function applyFilter(image, filter, value) {
    console.log(`Applying filter: ${filter}`);
    console.log(image);
    switch (filter) {
        case 'greyscale':
            image.greyscale()
            break;
        case 'saturate':
            image.modulate({brightness: value});
            break;
        case 'brightness':
            image.modulate({saturation: value});
            break;
        case 'contrast':
            const contrast = parseFloat(value/100);
            image.linear(contrast, -(128 * contrast) + 128);
            break;
        case 'sepia':
            image.recomb([
                [0.3588, 0.7044, 0.1368],
                [0.2990, 0.5870, 0.1140],
                [0.2392, 0.4696, 0.0912]
             ]);
        default:
            break;
    }
}

exports.handler = async (event) => {
    if (event.image) {
        let imageBuffer = Buffer.from(event.image.split(',')[1], 'base64');
        const imageType = event.type;
        const image = await sharp(imageBuffer);
        applyFilter(image, event.filter, parseInt(event.value));
        const buffer = await image.toBuffer();
        const newImageStr = `data:${imageType};base64,${buffer.toString('base64')}`;

        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
            },
            body: JSON.stringify({
                image: newImageStr
            })
        };
        return response;   
    } else {
        throw new Error("Parameter 'image' is missing");
    }
};

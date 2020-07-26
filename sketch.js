let baseImg; // for performing edge detection
let baseImgWidth;
let baseImgHeight;
let filtered; // filtered image with edges

function preload() {
    baseImg = loadImage('inputImg/content_BLM.gif');
}

// filter matrix to apply to base image
let filter = [
    [-1, 1, 0],
    [-1, 1, 1],
    [-1, 1, 0]
]

// gets called once
function setup() {
    baseImgWidth = baseImg.width;
    baseImgHeight = baseImg.height; 
    createCanvas(baseImgWidth*2, baseImgHeight);
    //background(0);
    filtered = createImage(baseImgWidth,baseImgHeight)
    noSmooth();
    image(baseImg,0,0,baseImgWidth,baseImgHeight);
    baseImg.loadPixels();
    filtered.loadPixels();

    // loop through all pixels to apply filter matrix
    // starts from 1 to (dimension-1) to ignore all edge pixels
    for (let x = 1; x < baseImgWidth-1; x++) {
        for (let y = 1; y < baseImgHeight-1; y++) {
            let rgb = convolution(baseImg, x, y, filter);
            let pix = index(baseImg, x, y);
            filtered.pixels[pix + 0] = rgb.r;
            filtered.pixels[pix + 1] = rgb.g;
            filtered.pixels[pix + 2] = rgb.b;
            filtered.pixels[pix + 3] = 255;
        }
    }
    filtered.updatePixels();
    image(filtered,baseImgWidth, 0, baseImgWidth, baseImgHeight);
}

function index(img, x, y) {
    return (x + y * img.width) * 4; // multiplying by 4 because each pixel accounts for r,g,b,a
}

// apply filter matrix to a neighborhood of 3x3 pixels, skipping edge pixels
function convolution(img, x, y, filter) {
    //let pixel = index(img, x, y);

    let sumR = 0;
    let sumG = 0;
    let sumB = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let pix = index(img, x + i, y + j);
            let factor = filter[j+1][i+1]; // because of decision to offset left pixel as -1, etc.; this is the weight applied from matrix

            sumR += img.pixels[pix+0] * factor;
            sumG += img.pixels[pix+1] * factor;
            sumB += img.pixels[pix+2] * factor;
        }
    }

    return {
        r: sumR, 
        g: sumB, 
        b: sumB
    };
}

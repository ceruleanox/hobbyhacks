

function setup() {

    noCanvas();
    inputImg = select('#input-img').elt;
    styleImg = select('#style-img').elt;

    // load models
    modelNames.forEach(n => {
        nets[n] = new ml5.TransformNet('models/' + n + '/', modelLoaded);
    });

    // output image container
    outputImgContainer = createImg('images/loading.gif', 'image');
    outputImgContainer.parent('output-img-container');

    console.log("stylesketch.js - setup()");
}



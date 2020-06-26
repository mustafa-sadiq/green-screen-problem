var foregroundImage = null;
var backgroundImage = null;

// initial global variable with uploaded image then display
function upload(type) {
    if (type == 'foreground') {
        var imgcanvas = document.getElementById("foregroundCanvas");
        var fileinput = document.getElementById("foregroundFile");
        foregroundImage = new SimpleImage(fileinput);
        foregroundImage.drawTo(imgcanvas);
    }
    else {
        var imgcanvas = document.getElementById("backgroundCanvas");
        var fileinput = document.getElementById("backgroundFile");
        backgroundImage = new SimpleImage(fileinput);
        backgroundImage.drawTo(imgcanvas);
    }
}

// solve using global var images
function solve() {
    // if either image not uploaded alert error
    if (foregroundImage == null || backgroundImage == null) {
        alert("Please upload both images. If it still doesn't work then give it a minute to let the picutes load.");
    }
    // check every pixel and replace if green else dont
    else {
        var output = new SimpleImage(foregroundImage.getWidth(), foregroundImage.getHeight());
        for (var pixel of foregroundImage.values()) {
            if (pixel.getGreen() > (pixel.getRed() + pixel.getBlue())) {
                var x = pixel.getX();
                var y = pixel.getY();
                var backgroundPixel = backgroundImage.getPixel(x, y);
                output.setPixel(x, y, backgroundPixel);
            }
            else {
                output.setPixel(pixel.getX(), pixel.getY(), pixel);
            }
        }
        imgcanvas = document.getElementById("solutionCanvas");
        output.drawTo(imgcanvas);
    }
}

// initial global variable with demo images then display 
function demo() {
    var imgcanvasForeground = document.getElementById("foregroundCanvas");
    var imgcanvasBackground = document.getElementById("backgroundCanvas");
    foregroundImage = new SimpleImage("test-fg.png");
    backgroundImage = new SimpleImage("test-bg.png");
    foregroundImage.drawTo(imgcanvasForeground);
    backgroundImage.drawTo(imgcanvasBackground);
}
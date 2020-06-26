var foregroundImage = null;
var backgroundImage = null;



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

function solve() {
    if (foregroundImage == null || backgroundImage == null) {
        alert("Please upload both images. If it still doesn't work then give it a minute to let the picutes load.");
    }
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


function demo() {    
    var imgcanvasForeground = document.getElementById("foregroundCanvas");
    var imgcanvasBackground = document.getElementById("backgroundCanvas");
    foregroundImage = new SimpleImage("test-fg.png");
    backgroundImage = new SimpleImage("test-bg.png");
    foregroundImage.drawTo(imgcanvasForeground);
    backgroundImage.drawTo(imgcanvasBackground);
}
//load our sound effect
const quackSound = new Audio(chrome.runtime.getURL("quack.mp3"));
//triggers event listen when we mouse click
document.addEventListener("click", (e) => {

    const duckPict = document.createElement("img");

    // CURSOR change: (didn't work)
    //document.documentElement.style.cursor = `url(${duckPict}) 16 16, auto`;

    //duckPict.src = "./duckPicture.jpg"
    //this wouldn't work because our main.js does not run relative to our extension directory
    //it will lead to relative to page url like http://www.youtube.com/duckPicture.jpg

    //instead we use
    duckPict.src = chrome.runtime.getURL("duckPicture.jpg");

    //postion our image so that we don't have it at the end of our page
    //by making it postion being absolute, we take the image out of the normal document flow
    duckPict.style.position = "absolute";
    //e.pageX is the x-coordinate (similar for y) where we click, since we have a size 50px by 50px image
    //we shift the x-coordinate by 25 to have the center of image on the click
    duckPict.style.left = `${e.pageX - 25}px`;
    duckPict.style.top = `${e.pageY - 25}px`;
    //set our image size
    duckPict.style.width = "50px";
    duckPict.style.height = "50px";
    //if we click on the duck image, there shouldn't be a new duck 
    duckPict.style.pointerEvents = "none"; 

    document.body?.appendChild(duckPict);

    //now we do the sound effect
    //reset our sound effect to start at the beginning of the mp3 file
    quackSound.currentTime = 0;
    //play
    quackSound.play();

    //if we want to change every image on our site to duck
    //we can first get all of the images using DOM, then use a foreach method 
    //to set them to our image of duck
    document.querySelectorAll("img").forEach(Img => {
        Img.src = chrome.runtime.getURL("duckPicture.jpg");
        //for responsive images, we have to set the srcset property
        Img.srcset = chrome.runtime.getURL("duckPicture.jpg");
    });
});

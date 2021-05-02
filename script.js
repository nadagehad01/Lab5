// script.js

const img = new Image(); // used to load image from <input> and draw to canvas
// Fires whenever the img object loads a new image (such as with img.src =)
const canvas = document.getElementById("user-image");
const reset = document.querySelector("[type='reset']");
const submitmeme = document.querySelector("[type='submit']");
const read = document.querySelector("[type='button']");
const img_input = document.getElementById('image-input');
const text1 = document.getElementById('text-top');
const text2 = document.getElementById('text-bottom');
const voice = document.getElementById('voice-selection');
const form = document.getElementById('generate-meme');
const ctx = canvas.getContext('2d');

img.addEventListener('load', () => {
  submitmeme.disabled=false;
  reset.disabled=true;
  read.disabled=true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const imgDim = getDimmensions(canvas.width, canvas.height, img.width, img.height);
  ctx.drawImage(img, imgDim.startX, imgDim.startY, imgDim.width, imgDim.height);

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});


img_input.addEventListener('change', () => {
  const img_url = URL.createObjectURL(img_input.files[0]);
  img.src=img_url;
  canvas.setAttribute('alt', img_url);
});


submitmeme.addEventListener('click', (generate) => {
  generate.preventDefault();
  submitmeme.disabled=true;
  reset.disabled=false;
  read.disabled=false;
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.strokeStyle = 'black';
  ctx.textAlign = "center";
  ctx.lineWidth = 5;
    ctx.strokeText(text1.value, canvas.width/2, 40);
    ctx.strokeText(text2.value, canvas.width/2, canvas.height-10)
    ctx.fillText(text1.value, canvas.width/2, 40);
    ctx.fillText(text2.value, canvas.width/2, canvas.height-10)    
  

});

reset.addEventListener('click', ()=>{
  submitmeme.disabled=false;
  reset.disabled=true;
  read.disabled=true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  text1.value='';
  text2.value='';
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}

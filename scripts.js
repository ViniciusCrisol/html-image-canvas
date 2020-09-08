let image;
let photoName;

const photoFile = document.getElementById('photo-file');
const cropButton = document.getElementById('crop-image');
const downloadButton = document.getElementById('download');
const selection = document.getElementById('selection-tool');
const photoPreview = document.getElementById('photo-preview');

document.getElementById('select-image').onclick = () => photoFile.click();

window.addEventListener('DOMContentLoaded', () => {
  photoFile.addEventListener('change', () => {
    const file = photoFile.files.item(0);

    photoName = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      image = new Image();
      image.src = event.target.result;
      image.onload = onLoadImage;
    };
  });
});

let startSelection = false;
let endX, endY, relativeEndX, relativeEndY;
let startX, startY, relativeStartX, relativeStartY;

const events = {
  mouseover() {
    this.style.cursor = 'crosshair';
  },
  mousedown() {
    const { clientX, clientY, offsetX, offsetY } = event;

    startX = clientX;
    startY = clientY;
    relativeStartX = offsetX;
    relativeStartY = offsetY;

    startSelection = true;
  },
  mousemove() {
    endX = event.clientX;
    endY = event.clientY;

    if (!startSelection) {
      return;
    }

    selection.style.display = 'initial';
    selection.style.top = startY + 'px';
    selection.style.left = startX + 'px';

    selection.style.width = endX - startX + 'px';
    selection.style.height = endY - startY + 'px';
  },
  mouseup() {
    startSelection = false;

    relativeEndX = event.layerX;
    relativeEndY = event.layerY;

    cropButton.style.display = 'initial';
  },
};

Object.keys(events).forEach((eventName) => {
  photoPreview.addEventListener(eventName, events[eventName]);
});

const canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

const onLoadImage = () => {
  const { width, height } = image;

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0);

  photoPreview.src = canvas.toDataURL();
};

cropButton.onclick = () => {
  const { width: imageWidth, height: imageHeight } = image;
  const { width: previewWidth, height: previewHeight } = photoPreview;

  const [widthFactor, heightFactor] = [
    +(imageWidth / previewWidth),
    +(imageHeight / previewHeight),
  ];

  const [selectionWidth, selectionHeight] = [
    +selection.style.width.replace('px', ''),
    +selection.style.height.replace('px', ''),
  ];

  const [croppedWidth, croppedHeight] = [
    +(selectionWidth * widthFactor),
    +(selectionHeight * heightFactor),
  ];

  const [actualX, actualY] = [
    +(relativeStartX * widthFactor),
    +(relativeStartY * heightFactor),
  ];

  const croppedImage = ctx.getImageData(
    actualX,
    actualY,
    croppedWidth,
    croppedHeight
  );

  ctx.clearRect(0, 0, ctx.width, ctx.height);

  image.width = canvas.width = croppedWidth;
  image.height = canvas.height = croppedHeight;

  ctx.putImageData(croppedImage, 0, 0);

  selection.style.display = 'none';

  photoPreview.src = canvas.toDataURL();

  downloadButton.style.display = 'initial';
};

downloadButton.onclick = () => {
  const a = document.createElement('a');

  a.download = photoName + '-cropped.png';
  a.href = canvas.toDataURL();

  a.click();
};

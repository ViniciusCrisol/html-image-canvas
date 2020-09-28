export default function (Photo) {
  Photo.cropButton = document.getElementById('crop-image');

  Photo.crop = function () {
    Photo.cropButton.onclick = () => {
      const { width: imageWidth, height: imageHeight } = Photo.image;
      const { width: previewWidth, height: previewHeight } = Photo.photoPreview;

      const [widthFactor, heightFactor] = [
        +(imageWidth / previewWidth),
        +(imageHeight / previewHeight),
      ];

      const [selectionWidth, selectionHeight] = [
        +Photo.selection.style.width.replace('px', ''),
        +Photo.selection.style.height.replace('px', ''),
      ];

      const [croppedWidth, croppedHeight] = [
        +(selectionWidth * widthFactor),
        +(selectionHeight * heightFactor),
      ];

      const [actualX, actualY] = [
        +(Photo.relativeStartX * widthFactor),
        +(Photo.relativeStartY * heightFactor),
      ];

      const croppedImage = ctx.getImageData(
        actualX,
        actualY,
        croppedWidth,
        croppedHeight
      );

      Photo.ctx.clearRect(0, 0, Photo.ctx.width, Photo.ctx.height);

      Photo.image.width = Photo.canvas.width = croppedWidth;
      Photo.image.height = Photo.canvas.height = croppedHeight;

      Photo.ctx.putImageData(croppedImage, 0, 0);

      Photo.selection.style.display = 'none';

      Photo.photoPreview.src = canvas.toDataURL();

      Photo.downloadButton.style.display = 'initial';
    };
  };
}

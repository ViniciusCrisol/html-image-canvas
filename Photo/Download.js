export default function (Photo) {
  Photo.downloadButton = document.getElementById('download');

  Photo.downlaod = function () {
    {
      const a = document.createElement('a');

      a.download = Photo.photoName + '-cropped.png';
      a.href = Photo.canvas.toDataURL();

      a.click();
    }
  };
}

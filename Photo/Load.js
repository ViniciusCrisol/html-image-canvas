export default function (Photo) {
  Photo.load = function () {
    Photo.photoFile = document.getElementById('photo-file');

    Photo.photoFile.addEventListener('change', () => {
      const file = photoFile.files.item(0);

      Photo.photoName = file.name;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = onLoadReader;
    });

    function onLoadReader() {
      Photo.image = new Image();
      Photo.image.src = event.target.result;
      Photo.image.onload = onLoadImage;
    }

    const onLoadImage = () => {
      const { width, height } = Photo.image;

      Photo.canvas.width = width;
      Photo.canvas.height = height;

      Photo.ctx.clearRect(0, 0, width, height);
      Photo.ctx.drawImage(Photo.image, 0, 0);

      Photo.preview();
    };
  };
}

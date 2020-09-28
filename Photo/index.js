import Canvas from './Canvas.js';
import Preview from './Preview.js';
import Load from './Load.js';
import SelectionTool from './SlectionTool.js';
import Crop from './Crop.js';
import Download from './Download.js';

const Photo = {
  photoPreview: document.getElementById('photo-preview'),
};

Canvas(Photo);
Preview(Photo);
Load(Photo);
SelectionTool(Photo);
Crop(Photo);
Download(Photo);

export default Photo;

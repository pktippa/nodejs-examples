// var ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
var proc = ffmpeg('./input/trailer.mp4')
  // setup event handlers
  .on('filenames', function(filenames) {
    console.log('screenshots are ' + filenames.join(', '));
  })
  .on('end', function() {
    console.log('screenshots were saved');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  // take 2 screenshots at predefined timemarks and size
  .takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '150x100' }, './output/');
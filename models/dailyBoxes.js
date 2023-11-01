const mongoose = require('mongoose');

const imageUrlRegex = /^(ftp|http|https):\/\/[^ "]+\.(jpg|jpeg|png|gif)$/;
const imagePathRegex = /^.*\.(jpg|jpeg|png|gif)$/;

const videoUrlRegex = /^(ftp|http|https):\/\/[^ "]+\.(mp4|avi|mkv|webm|mov)$/;
const videoPathRegex = /^.*\.(mp4|avi|mkv|webm|mov)$/;

const audioUrlRegex =
  /^(ftp|http|https):\/\/[^ "]+\.(mp3|wav|ogg|flac|wmv|avi|mpg|mov|mkv|mp4|webm)$/;
const audioPathRegex = /^.*\.(mp3|wav|ogg|flac|wmv|avi|mpg|mov|mkv|mp4|webm)$/;

const contentSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => {
        imageUrlRegex.test(v) || imagePathRegex.test(v);
      },
      message: '유효한 이미지 URL 또는 파일 경로가 아닙니다!',
    },
  },
  video: {
    type: String,
    validate: {
      validator: (v) => {
        videoUrlRegex.test(v) || videoPathRegex.test(v);
      },
      message: '유효한 동영상 URL 또는 파일 경로가 아닙니다!',
    },
  },
  audio: {
    type: String,
    validate: {
      validator: (v) => {
        audioUrlRegex.test(v) || audioPathRegex.test(v);
      },
      message: '유효한 오디오 URL 또는 파일 경로가 아닙니다!',
    },
  },
});

const dailyBoxSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, '날짜가 지정되어 있지 않습니다.'],
  },
  content: contentSchema,
  isOpen: {
    type: Boolean,
    required: [true, '날짜 박스 오픈 옵션이 지정되어 있지 않습니다.'],
  },
});

module.exports = mongoose.model('DailyBox', dailyBoxSchema);
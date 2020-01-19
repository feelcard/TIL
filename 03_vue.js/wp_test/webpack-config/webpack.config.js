module.exports = { 
    entry: './script.js',// 설정하지 않을시 default는 ./src/index.js 이다.

    output: {
        path: __dirname,//현재 디렉토리의 경로
        filename: 'biuld.js'//웹팩 사용후 합쳐진 js파일의 이름
      }// 설정하지 않을시 default는 .dist/main.js 이다.

};

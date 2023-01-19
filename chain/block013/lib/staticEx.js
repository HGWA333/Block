// lib은 library 라이브러리는 다른 프로젝트에 온전하게 적용하여 사용 가능한 코드일 때

// express.static 적용 시 라우터에 따라 파일을 바로 응답한다.
// static.js 에서 public 내의 파일, 폴더를 미리 읽어둔다.

const fs = require("fs");
const path = require("path");

console.log("dirname:", __dirname);
const publicPath = path.join(__dirname, "../", "public");
console.log("publicPath:", publicPath);

const directory = fs.readdirSync(publicPath);
console.log(directory);
// readdirSync()폴더 내 모든 파일 그리고 폴더의 이름을 가져온다.
// Sync는 동기로 실행하는 것으로 Promise 개념과는 관련이 없음

const folderStatus = fs.statSync(publicPath);
console.log("folderStatus:", folderStatus);
console.log("folderStatus:", folderStatus.isFile());
// stat는 파일의 정보를 가져온다.
// Sync는 동기로 실행하는 것으로 Promise 개념과는 관련이 없음
// isFile()메서드는 파일인지 아닌지 확인하는 boolean 메서드 참거짓 판별 함

fs.stat(path.join(publicPath, "index.html"), (err, stat) => {
  console.log("isFile:", stat.isFile());
  // is***() 메서드는 boolean 메서드 참거짓 판별 하는 용도
});

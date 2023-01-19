// Array.join(a)은 a를 각 아이템 사이에 넣고 string화 한다.  예) [1,2,3].join(a) => [1,2,3,a]
// path.join(a,b,c,...)은 a와 b와 c ...을 연결하여 경로를 만든다. 예) ("C:\Users","kga-00","Documents") => (C:\Users\kga-00\Documents) 로 변환
// mac이나 linux에서는 /, 윈도우에서는 \가 경로를 나타내 줌
const fs = require("fs");
const path = require("path");

function getStaticPath(root = "public") {
  // root가 전달된 값이 없으면 'public'으로 정의한다.
  const staticRoutes = {};
  const publicPath = path.join(__dirname, "../", root);

  function find(_currentPath) {
    const directory = fs.readdirSync(_currentPath);
    for (let i = 0; i < directory.length; ++i) {
      const findPath = path.join(_currentPath, directory[i]);
      // const findPath = path.join(_currentPath, "index.html");
      // 파일 경로를 받아온다.
      // 이후 findPath를 라우터로 붙혀 준다. 현재 findPath 경로를 /으로 만들 것이다.
      console.log("findPath:", findPath);
      const isFile = fs.statSync(findPath).isFile();

      if (isFile) {
        // 만약 파일이면
        let router = findPath.replace(publicPath, "");
        console.log("router 1:", router);

        if (router.indexOf("index.html") > -1) {
          router = path.join(router, "../");
          console.log("router2:", router);

          router = router.replace(/\\/g, "/");
          console.log("router3:", router);
        }
        if (router.length > 1 && router[router.length - 1] === "/")
          router = router.slice(0, router.length - 1);
        staticRoutes[router] = findPath;
      } else {
        // 파일이 아니라 폴더라면
        find(findPath);
      }
    }
  }
  find(publicPath);
  console.log("staticRoutes", staticRoutes);

  global.staticRoutes = staticRoutes;
  // global.staticRoutes = staticRoutes은 전역으로 사용하기 위한 설정
  return staticRoutes;
}

module.exports = getStaticPath;

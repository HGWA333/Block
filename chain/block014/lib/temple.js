// html 파일을 가져와서 수정하여 완성된 HTML을 반환하도록 한다.
// template(템플릿)은 이미 만들어져있는 틀
// 디자인적 또는 코드상에 완성된 html을 가져다 작업자가 원하는 데이터를 입력하여 페이지를 만든다.
const fs = require("fs");
// fs는 파일을 가져오는 file system
const path = require("path");

const createHtml = (fileName, data, { styleName, scriptName }) => {
  // createHtml이 받는 매개변수는 index.js에서 templateFunc가 res.send(temp)로 보낸 데이터를 받고 있다.
  // 여기서 받는 매개변수 data = templateFunc가 보낸 res.send(temp)
  // fileName은 res.js에서 sendFile(fileName){}로 보내고 그걸 받은 데이터는

  // {const target = path.join(__dirname, "../public", fileName);
  //  const readLine = fs.readFileSync(target, "utf-8");
  //  const messgae = createMessage(readLine);
  //  client.write(messgae);}
  //  이 데이터를 받는다.

  // styleName은 객체형식 {styleName: "index.css"}로 받음
  // scriptName은 {scriptName: "index.js"}로 받음
  const target = path.join(__dirname, "../views", fileName);
  let readLine = fs.readFileSync(target, "utf-8");

  const keys = Object.keys(data);
  // 객체화 된 keys(data)의 값을 배열화로 변환한다.
  // keys의 형태는 객체 형식으로 sting 자료형을 가지고 있다.
  // keys(data)의 형태는 {"a","b","1:a"} 이런 형태

  for (let i = 0; i < keys.length; i++) {
    // keys의 형태는 객체이다. 객체의 길이는 객체에 존재하는 프로퍼티의 갯수의 길이다.

    if (Array.isArray(data[keys[i]])) {
      // data로 받은 값이 배열인지 확인 하고 배열이면 실행
      // {"a","b","1:a"}의 객체의 길이의 값은 3이다.
      // Array.isArray(data[keys[i]))는 data[keys[i]가 배열인지 아닌지 확인
      // data[keys[i]의 형태 = [data[keys[i]]]면 작동

      const subTarget = path.join(target, "../", keys[i] + ".html");
      // 여기서 keys[i]의 형태는 [ 'li' ] 이런 데이터가 들어온다.
      // 여기서 subTarget은 C:\Users\KGA_12\Desktop\Block\chain\block014\views\board\li.html 이런 형태의 데이터가 들어온다.

      console.log("keyskeyskeyskeyskeyskeyskeyskeyskeyskeyskeys:", [keys[i]]);
      console.log("subTargetsubTargetsubTargetsubTargetsubTarget:", subTarget);

      const subLine = fs.readFileSync(subTarget, "utf-8");
      // subLine은 C:\Users\KGA_12\Desktop\Block\chain\block014\views\board\li.html 데이터를
      // readFileSync를 통하여 utf-8로 변환하여 <li>{{item}}</li>로 가공을 한다.

      console.log("subLinesubLinesubLinesubLinesubLinesubLine:", subLine);
      let subReadLine = "";

      for (let j = 0; j < data[keys[i]].length; ++j) {
        // [ 'li' [생성되는 게시글 인덱스]의길이 ] + 1 일때 작한다.

        subReadLine += subLine.replace("{{item}}", data[keys[i][j]]);
        // subReadLine의 형태는 <li>클라이언트에서 입력한 값<li> 형태다.
      }
      console.log("subReadLinesubReadLinesubReadLinesubReadLine:", subReadLine);

      readLine = readLine.replace(`{for{{${keys[i]}}}}`, subReadLine);
    } else {
      // data로 받은 값이 배열이 아니면 실행
      readLine = readLine.replace(`{{${keys[i]}}}`, data[keys[i]]);

      console.log(
        "readLine readLine readLine readLine readLine readLine:",
        readLine
      );
    }
  }
  if (styleName) {
    // styleName views 폴더의 index.css 파일을 가져와 적용한다.
    const StyleTarget = path.join(__dirname, "../views", styleName);
    let StyleReadLine = fs.readFileSync(StyleTarget, "utf-8");
    readLine = readLine.replace(`{{style}}`, StyleReadLine);
    console.log("StyleReadLineStyleReadLineStyleReadLine", StyleReadLine);
    console.log("readLinereadLinereadLinereadLinereadLine", readLine);
  }
  if (scriptName) {
    // scriptName views 폴더의 index.js 파일을 가져와 적용한다.
    const ScriptTarget = path.join(__dirname, "../views", scriptName);
    let ScriptReadLine = fs.readFileSync(ScriptTarget, "utf-8");
    readLine = readLine.replace(
      `{{script}}`,
      `<script>${ScriptReadLine} </script>`
    );

    // ScriptReadLine은 views/board/index.js 파일 속  const ulElem = document.getElementsByTagName("ul")[0]  axios.get실행
    console.log("ScriptReadLineScriptReadLineScriptReadLine", ScriptReadLine);
    console.log("readLinereadLinereadLinereadLinereadLine", readLine);
  }

  readLine = readLine.replace("{{title}}", "SSR 테스트중");
  readLine = readLine.replace("{{text}}", "SSR 처음 써봄");
  //   readLine = readLine.replace("{{text}}", data.query.text || "SSR 처음 써봄");
  readLine = readLine.replace("{{link}}", "/test");
  readLine = readLine.replace("{{linkName}}", "들어가면 404");
  console.log(readLine);
  return readLine;
};

module.exports = createHtml;

// const a = 1;
// function func1() {
//   //   const a = 2;
//   console.log(a);
// }
// // func1();

// function func2() {
//   const a = 3;
//   func1();
// }
// func2();

const a = 1;
function func1() {
  console.log(func1);
}

function func2() {
  func1();
  console.log(func2);
  func4();
}

function func3() {
  func2();
  console.log(func3);
}
function func4() {
  console.log(func4);
}
func3();

1243;

const x = "x";

function c() {
  console.log("c", x);
}

function a() {
  const x = "xx";
  console.log("a", x);
  function b() {
    console.log("b", x);
    c();
  }
  b();
}

a();

// a: const x="xx" consoloe.log 실행
// b: b는 a의 const x="xx"를 받아옴
// c: c는 const x="x"를 받아옴

function recursive(a) {
  console.log(a);
  recursive(a + 1);
}
recursive(1);

// recursive 실행하면 터짐

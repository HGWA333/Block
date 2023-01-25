let age: number = 30;
let isCar: boolean = true;

// --- 01. 배열 number형 사용할 때
let a: number[] = [1, 2, 3];
let a2: Array<number> = [1, 2, 3];

// --- 02. 배열 string형 사용할 때
let b: string[] = ["a", "b", "c"];
let b2: Array<string> = ["a", "b", "c"];

// --- 03. 튜플 : 각 idx에 자료형을 설정 할 수 있음
let c: [string, number];
c = ["z", 1];
// c2 = [1, "z"];
// 만약 0번에 string형이 아닌 다른 자료형이 들어가면 에러남
// 0번 idx에는 string형, 1번 idx에는 number형만 사용할 수 있음

c[0].toLowerCase();
// c[1].toLowerCase();
// 위의 상황은 1번째 idx가 number형식의 자료형 타입이다. number형식에는 toLowerCase를 사용할 수 가 없음 그래서 에러가 난다.
// 변수 c의 초기 설정을 let c: [string, number]으로 배열의 첫 번째 idx에 string형으로, 두 번째 idx에 number형으로 설정했기 때문
// 그래서 number타입에 사용할 수 있는 메서드를 사용해야 됨

// --- 04. void
function sayHellow(): void {
  console.log("hello");
}
// 함수 sayHllow()옆에 : vioid를 사용한 이유는 함수 자체에 리턴하는 값이 없을 때는 void를 사용해야 한다.

// --- 05. never
function showErr(): never {
  throw new Error();
}
// never는 항상 에러를 반환하거나

function infLoop(): never {
  while (true) {}
}
// 영원히 끝나지 않고 무한으로 반복하는 함수에 사용한다.

// --- 06. enum : 비슷한 값끼리 묶어 둔 것

enum Os {
  Window = 7,
  Ios = 3,
  Android,
}

// enum에 값을 주지 않았을 경우 입력된 순서에 따라 number형으로 0, 1, 2 ... 순으로 값이 정해진다.
// 또 enum은 양방향으로 매핑이 된다.

console.log(Os["Window"]); // "Window" 넣으면 7의 값을 반환함
console.log(Os[7]); // 7의 값을 넣으면 "Window" 값을 반환함

enum Os1 {
  Window = "win",
  Ios = "ios",
  Android = "and",
}

// 위와 같은 상황은 단방향으로 매핑이 된다. 즉 string 형식으로만 값을 반환한다.

let myOs: Os1;
// myOs는 Os1이다. 라고 초기화를 하면 Os1의 데이터 Window, Ios, Android만 사용이 가능하다.
// myOs = Os.Window 처럼 특정 값만 입력하는 것을 강제할 수 있다.
// enum을 사용할 때는 특정 값이 공통점이 있을 때 사용을 한다.

// --- 07. null, undefined

let n: null = null;
let u: undefined = undefined;

// Typescript 함수

// --- 01. 리턴 값

// --- 리턴 값 없을 때 void
function TestVoid(num1: number, num2: number): void {
  // (매개변수:number형): 리턴 값이 없어 타입을 : void로 설정
  console.log(num1 + num2);
}

// --- 리턴 값 boolean형
function TestBoolean(age: number): boolean {
  // (매개변수:number형): 리턴 값은 : boolean값으로 설정
  return age > 19;
}

// --- 리턴 값 string형
function TestString(name?: string): string {
  // (매개변수:string형): 리턴 값은 : string 설정
  return `Hi, ${name || "Hellow"}`;
  // 매개변수 값 name이 있으면 name을 출력 없으면 Hellow를 출력
}

// function TestString(name = "Hellow") {
//   return `Hi, ${name}`;
// }
// TestString() JS 형태의 모습

// const result = TestString();
// ts에서 위와 같은 상황은 매개변수 값이 있어야 작동을 한다.
// 그래서 매개변수 name뒤에 ?를 붙힌다.
// ?는 선택적 매개변수 타입 옵션으로 undefined을 추가하는 의미
// 즉 매개변수 값이 string이거나 or undefined이거나 해야 한다.

const result = TestString("hey");
// const result1 = TestString(123);

// --- 02. 선택적 매개변수

// 선택적 매개변수는 함수에서 받는 매개변수에 ?를 붙히고 타입을 적는 형식이다.
// 예) hello(name?:string){}

function hello1(age?: number, name: string): string {
  if (age !== undefined) {
    return `Hello, ${name}. You are ${age}.`;
  } else {
    return `Hello, ${name}.`;
  }
}

function hello2(name: string, age?: number): string {
  if (age !== undefined) {
    // 여기서 매개변수 age의 값에는 number와 undefined가 들어있다.
    return `Hello, ${name}. You are ${age}.`;
  } else {
    return `Hello, ${name}.`;
  }
}

// 위 hello1과 hello2 함수가 있다. 여기서 매개변수 부분을 살펴보면, 하나는 선택적 매개변수가 붙은 것이 첫 번째 위치해 있고 또 다른 하나는 맨 마지막에 붙어 있는 것을 확인할 수 있다.
// 여기서 hello1은 에러가 나고 hello2는 에러가 나지 않고 정상 작동한다.
// 그 이유는 선택적 매개변수 ? 에는 undefined 값을 포함하고 있다. 그래서 hello1의 매개변수는 age:number | undefined, name: string 형태
// 따라서 선택적 매개변수가 필수적 매개변수보다 앞에 있으면 에러가 난다. 옵션이 있는 값은 입력을 안해도 된다는 것은 ts에서 성립 안함.
// hello2의 매개변수는 name: string, age:number | undefined 형태이다. 그래서 에러 없이 정상 작동한다.
// 만약 hello1 처럼 사용을 하고 싶다면 hello3 처럼 사용을 하면 된다.

function hello3(age: number | undefined, name: string): string {
  if (age !== undefined) {
    return `Hello, ${name}. You are ${age}.`;
  } else {
    return `Hello, ${name}.`;
  }
}

// hello1과 hello3은 똑같은 형태이다.

// --- 03. 나머지 매개변수

function add(...nums: number[]) {
  return nums.reduce((result, num) => result + num, 0);
}

add(1, 2, 3);
add(1, 2, 3, 4, 5, 6, 7);

// 나머지 매개변수는 add의 함수로 들어가는 인자의 갯수가 매번 바뀔 수 있다.
// 그래서 add의 인수로 전달받은 매개변수 ...nums는 배열로 나타나게 할 수 있도록 한다. 그래서 ...nums의 타입은 number[]로 배열 형태로 설정한다.

// --- 04. this

interface User {
  name: string;
}
// User라는 인터페이스가 name이라는 string 속성을 가지고 있다.

const Sam: User = {
  name: "what",
};
// Sam은 User 인터페이스 타입을 가지고 있는 객체다.

function showName() {
  console.log(this.name);
}
// showName함수는 this의 name을 보여준다.
// 여기서 this는 사용하는 방법에 따라 다르다.
// 여기서 this는 타입이 지정이 안되어 any로 설정이 되어있다.
// 그래서 아래 this를 매개변수를 넣어 타입을 지정해준다.

const a = showName.bind(Sam);
// a는 바인드를 이용해서 this를 Sam 객체를 강제하고 있다.
a();

function passName(this: User) {
  // this의 타입은 인터페이스로 설정해둔 User를 타입으로 지정
  console.log(this.name);
}

const b = passName.bind(Sam);
b();

function TestName(this: User, age: number, gender: "m" | "f") {
  // this의 타입은 인터페이스로 설정해둔 User를 타입으로 지정
  console.log(this.name, age, gender);
}

const c = TestName.bind(Sam);
c(23, "m");
// 여기서 TestName에 전달된 매개변수는 this: User, age: number, gender: "m" | "f" 이렇게 3개가 있다.
// 하지만 첫 번째 매개변수의 시작점은 age 부터 시작을 한다.
// 즉 this:User는 매개변수가 아닌 this 자체의 타입을 설정하는 것

interface Tuser {
  name: string;
  age: number;
}

// 함수 오버로드 사용
function join(name: string, age: number): Tuser; // = const sam: Tuser = join("sam", 30);
function join(name: string, age: string): string; // = const bam: string = join("sam", "30");

function join(name: string, age: number | string): Tuser | string {
  // join 함수는 매개변수로 받는 name과 age의 타입에 따라 리턴하는 값이 달라지는 분기 점이 있다.
  // join 함수에서는 동일한 매개변수라도 타입을 다르게 설정할 수 있다. 예) age: number | string
  // join 함수는 전달받는 매개변수 age의 타입에 따라서 리턴하는 값이 달라진다.
  // Tuser | string  = 객체를 리턴하거나 | 문자열을 리턴한다.
  // 이럴 땐 함수 오버로드를 사용한다.
  // 함수 오버로드는 전달받은 매개변수의 갯수나 타입에 따라 다른 동작을 하게 하는 것을 말한다.

  if (typeof age === "number") {
    // 만약 매개변수 age로 들어온 타입이 number형이라면
    return {
      name,
      age,
    };
    // name과 age를 리턴한다.
  } else {
    // 만약 매개변수 age로 들어온 타입이 string이라면
    return "나이는 숫자로 입력해라";
    // "나이는 숫자로 입력해라" string형 데이터 리턴
  }
}

const sam: Tuser = join("sam", 30);
const bam: string = join("sam", "30");
// join 함수는 매개변수로 받는 name과 age의 타입에 따라 리턴하는 값이 달라지는 분기 점이 있다.
// 그래서 위 코드들은 에러가 난다. 이걸 해결 하기 위해서 오버로드를 사용한다.

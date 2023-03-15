// TypeScript 인터페이스

// --- 01. 인터페이스 사용 방법

let user: object;

// 변수 user를 객체형식 {}으로 초기화. user는 {} 형식으로만 사용할 수 있다.

user = {
  name: "abc",
  age: 30,
};

// 여기서 객체형식 user의 키 값인 name의 키 값을 접근 하기 위해 console.log(user.name)를 찍어보면 에러가 난다.
// 그래서 이럴 때 인터페이스를 사용하여 문제를 해결 할 수 있다.

type TestText = "a" | "b" | "c" | "d";

interface User {
  name: string; // 키 값에 자료형 설정
  age: number;
  gender?: string;
  readonly birth: number;
  // [grade: number]: string;
  // use의 키는 number형 값은 string형식을 가진 것을 모두 grade에 담는다.
  [grade: number]: TestText;
}

let use: User = {
  name: "ww", // 값에 자료형 데이터 설정
  age: 30,
  birth: 2000,
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  // 1: "ab"
  // 위와 같은 텍스트 타입을 넣을 수 없다. 왜냐면  [grade: number]: TestText으로 설정한 것에서 TestText를 type TestText = "a" | "b" | "c" | "d";로 설정을 했기 때문에
  // number : "a", number : "b", number : "c", number : "d" 만 사용이 가능하다. 만약 다른 데이터를 사용한다면 [grade: number]: 데이터, 데이터 = "내용" | "내용" | "내용" | ... 을 추가해서 사용하면 된다.
};

// let use : 인터페이스 = {
//  키 값 : 자료형
// }

// 위와 같이 인터페이스를 사용하면  객쳐 use의 키 값에 접근이 가능하다.
console.log(use.name);
console.log(use.age);

use.age = 20;
// use의 키 age의 값을 변경 할 수도 있다.

// use.gender = "male"
// 하지만 위와 같은 식으로 use에 키와 값을 추가할 수 없다.
// gender? = string은 자료형 string, undefined의 값을 가지고 있다.
// ?는 옵션을 추가하는 것으로 undefined 값을 추가

// use.birth = 1999;
// 인터페이스에 readonly birth: number "readonly"가 붙었을 경우 읽기 전용으로 설정이 되어 수정이 불가능하다.
// readonly은 처음 설정 할 때만 설정을 할때 사용

// --- 02. 인터페이스 함수 사용 방법

// 매개변수 number형으로 설정
interface Add {
  (_num1: number, _num2: number): number;
  // (num1 : 매개변수 자료형 타입 설정 , num2 : ""):  리턴 값 타입설정
}

const add: Add = function (_x, _y) {
  // _x, _y는 interface Add에 _num1, _num2의 타입을 number으로 설정을 해놓아서 _x, _y에도 넘버형을 받는다.
  return _x + _y;
  // 리턴 값 타입도 number형으로 설정 해놓았기 때문에 return은 넘버형으로 설정 된 _x + _y를 리턴한다.
};

add(10, 20);
// add의 매개변수 _x, _y의 타입은 number형으로 되있기 때문에 에러가 안나고 정상작동

// add(10, "20")
// add의 매개변수 _x, _y의 타입은 number형으로 되있기 때문에 두 번째 매개변수 _y는 string 형식 자료형이라 에러가 난다.

// 매개변수 타입을 number형으로 만들고 리턴 값은 boolean으로 설정
interface IsAdult {
  (age: number): boolean;
  // interface IsAdult는 매개변수 age를 number형 타입으로 설정하고 리턴 값을 boolean으로 설정
}

const WhatAge: IsAdult = (age) => {
  return age > 19;
};

WhatAge(33);
// 리턴 값을 boolean으로 설정하여 true로 반환
WhatAge(18);
// 리턴 값을 boolean으로 설정하여 false로 반환

// --- 03. 인터페이스 class 사용 방법

interface Car {
  // 기본 인터페이스 설정
  color: string;
  wheels: number;
  start(): void;
  // start() 메서드의 리턴 값은 없다. 그래서 void로 타입 설정
}

interface Benz extends Car {
  // 여기서 extends Car 하여 Benz는 Car가 가지고 있는 color, wheels, start()의 속성들을 모두 가지고 있다.
  door: number;
  stop(): void;
  // 이후 door과 stop() 속성을 추가 한다.
}

class Bmw implements Car {
  color;
  wheels = 3;
  constructor(c: string) {
    this.color = c;
    // 생성되는 color의 c의 값 데이터 타입을 string형으로 설정
  }
  start() {
    console.log("testMan");
    // void를 설정하여 리턴 값이 없음
  }
}

const testClass = new Bmw("red");
console.log(testClass);
testClass.start();

// --- 03. 인터페이스 class 사용 확장 방법

interface Toy {
  name: string;
}

interface ToyCar extends Car, Toy {
  // Car와 Toy의 속성들을 ToyCar가 모두 가지고 있다.
  price: number;
}

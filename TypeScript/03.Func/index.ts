// Typescript 함수

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

// Typescript 자료형

let num: number = 1234;
let str: string = "1234";
let bool: boolean = true;
let und: undefined = undefined;
let nul: null = null;

// und = 1234 으로 초기화시 에러가 난다.
// Typescript는 자료형(Type)을 확인하기 때문에 같은 자료형만 변수에 정의할 수 있다.

num = 4321;
// console.log(num.length); number 에는 길이가 없기 때문에 오류가 난다.
// console.log(str.length); string 에는 길이가 있기 때문에 오류가 안난다.

let any: any = undefined;
any = "1234";
any = 1234;
// any는 모든 자료형을 포함한다. 그래서 웬만해서는 사용 안하는 것이 좋다.
// any를 사용하는 것은 기존 Javascript를 사용하는 것 과 같음

let unk: unknown = undefined;
unk = "1234";

console.log(any.length); // 길이가 존재 (모든 자료형을 포함하고 있다고 판단하여 각종 메서드, 키를 모두 사용할 수 있다.)
console.log(unk.length); // 길이가 존재 하지 않음 (자료형을 모른다고 판단하여 각종 메서드, 키를 사용할 수 없다. unk은 Type을 확인 후에 메서드, 키를 사용할 수 있음)

if (typeof unk == "string") {
  // unk은 Type을 확인 후에 해당 타입에 대한 메서드, 키를 사용할 수 있다.
  console.log(unk.length);
}

let objNum: { a: number } = { a: 1 };
let objStr: { a: string } = { a: "1" };

let obj: { a: number; b?: string } = { a: 1 };
// b뒤에 붙은 ?는 string 뿐만 아니라 undefined를 포함한다.

let numUnd: number | undefined = undefined;
// |를 사용하여 type를 여러 개 사용할 수 있다.
// 앞의 자료형이 없으면 뒤에 위치한 자료형을 적용한다.

let objTest: { a: number; b?: string } = { a: 1 };
// ?는 undefined를 포함한다.
obj.b = "1234";

let arr: Array<number> = [1, 2, 3];
// arr.push("abcd");
// Array 배열은 number형으로 설정을 해 놓아서 arr.push "abcd" string형을 넣을 수 없다.

let arr1: [number, string] = [1, "1"];
// arr1.push(1)

let arr2: string[] = ["1", "a", "b"];
// arr1.push("abc")

let arr3: Array<any> = [undefined, null, 1, "abc"];
// 웬만해선 사용하지 말 것

function funcA(): void {
  // return이 없기 때문에 void type을 사용한다.
  // 리턴이 없을 때 사용
  console.log("funcA");
}

const funcB = function (): number {
  return 1;
  // 만약 number 타입에서 return이 없으면 에러가 난다.
};

const funcC = function (): string {
  return "abc";
  // 만약 string 타입에서 return이 없으면 에러가 난다.
};

// 함수의 return에 대한 type은 () 뒤에 붙인다.

function sumA(a: number, b: number): number {
  return a + b;
}
// 함수 뿐만 아니라 매개변수에도 타입을 붙혀준다.

function sumB(numbers: { a: number; b: number }): number {
  return numbers.a + numbers.b;
}

const sumC = ({ a, b }: { a: number; b: number }): number => {
  return a + b;
};

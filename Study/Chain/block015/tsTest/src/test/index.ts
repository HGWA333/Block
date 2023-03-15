let age: number = 30;
let isCar: boolean = true;

// 배열 number형 사용할 때
let a: number[] = [1, 2, 3];
let a2: Array<number> = [1, 2, 3];

// 배열 string형 사용할 때
let b: string[] = ["a", "b", "c"];
let b2: Array<string> = ["a", "b", "c"];

// 튜플 : 각 idx에 자료형을 설정 할 수 있음
let c: [string, number];
c = ["z", 1];
// 0번 idx에는 string형, 1번 idx에는 number형만 사용할 수 있음
// 만약 0번에 string형이 아닌 다른 자료형이 들어가면 에러가남
// b = [1, "z"];

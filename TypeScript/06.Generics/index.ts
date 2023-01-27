// Typescript 제네릭(Generics) 타입

function TestGetSize(arr: number[] | string[] | boolean[] | object[]): number {
  return arr.length;
}

const TestArr1 = [1, 2, 3];
TestGetSize(TestArr1);

const TestArr2 = ["a", "b", "c"];
TestGetSize(TestArr2);

const TestArr3 = [false, true, true];
TestGetSize(TestArr3);

const TestArr4 = [{}, {}, { name: "trim" }];
TestGetSize(TestArr4);

// --- 제네릭 타입1

function getSize<T>(arr: T[]): number {
  return arr.length;
}
// getSize<T>는 내가 원하는 타입을 넣을 수 있다.

const arr1 = [1, 2, 3];
getSize<number | string>(arr1);
// getSize에 매개변수 타입을 number타입 | string타입으로 설정

const arr2 = ["a", "b", "c"];
getSize<string>(arr2);
// getSize에 매개변수 타입을 string타입으로 설정

const arr3 = [false, true, true];
getSize<boolean>(arr3);
// getSize에 매개변수 타입을 boolean타입으로 설정

const arr4 = [{}, {}, { name: "trim" }];
// getSize에 매개변수 타입을 object타입으로 설정
getSize<object>(arr4);

// --- 제네릭 타입2 옵션 형태

interface TestMobile<T> {
  name: string;
  option: T;
}
// TestMobile<T>에 T는 option

const m1: TestMobile<{ color: string; coupon: boolean }> = {
  name: "iphone12",
  option: {
    color: "blue",
    coupon: false,
  },
};
// TestMobile<{ color: string; coupon: boolean }> 에서 {color:"값", coupon: boolean(true, false)값 }으로 사용할 수 있다.

const m2: TestMobile<Object> = {
  name: "iphone15",
  option: {},
};

// TestMobile<Object>에서 <Object>을 사용해서 옵션은 {} 객체로 사용할 수 있음.

const m3: TestMobile<string> = {
  name: "iphone15",
  option: "yeah",
};

// TestMobile<string>에서 <string>을 사용해서 옵션은 string타입을 사용할 수 있음.

// --- 제네릭 타입3

interface User {
  name: string;
  age: number;
}

interface MyCar {
  name: string;
  color: string;
}

interface Book {
  price: number;
}

const heyman: User = { name: "hi", age: 11 };
const car: MyCar = { name: "n74", color: "green" };
const book: Book = { price: 3000 };

function showName<T extends { name: string }>(_data: T): string {
  return _data.name;
}

showName(heyman);
showName(car);
// showName(book);

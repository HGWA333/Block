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

const arr1 = [1, 2, 3];
getSize<number | string>(arr1);

const arr2 = ["a", "b", "c"];
getSize<string>(arr2);

const arr3 = [false, true, true];
getSize<boolean>(arr3);

const arr4 = [{}, {}, { name: "trim" }];
getSize<object>(arr4);

// --- 제네릭 타입2

interface TestMobile<T> {
  name: string;
  option: T;
}

const m1: TestMobile<{ color: string; coupon: boolean }> = {
  name: "iphone12",
  option: {
    color: "blue",
    coupon: false,
  },
};

const m2: TestMobile<string> = {
  name: "iphone15",
  option: "yeah",
};

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

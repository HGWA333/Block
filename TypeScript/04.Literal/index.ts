// Typescript 리터널 타입

// --- 01. 문자열 리터널 타입1
const userNmae1 = "ho";
// const로 userNmae1을 초기화 하면 userNmae1은 "ho" 값 자체를 가지고 있다.
// const로 userNmae1을 초기화한 userNmae1의 타입은 string이지만 다른 값을 가질 수 없다. 그래서 "ho" 값 자체를 가지고 있음
let userNmae2 = "oh";
// let로 userNmae2를 초기화 하면 userNmae2는 값이 아닌 string 타입을 가지고 있다고 알려준다.
// let로 userNmae2를 초기화한 userNmae2는 언제든지 다른 값으로 변화가 가능하여 어떤 타입을 가지고 있는지를 알려준다.

userNmae2 = 3;
// 이때 userNmae2에 number형 3의 값을 할당하면 에러가난다.
// 만약 userNmae2에 number형 3의 값을 할당하고 싶다면 userNmae3 처럼 작성하면 된다.

let userNmae3: string | number = "hu";
userNmae3 = 3;

// 위와 같이 userNmae3 뒤에 타입 string과 number를 넣으면 된다.
// 이러한 userNmae3 같은 형식이 문자열 리터널 타입이라고 한다.

// --- 02. 문자열 리터널 타입2

type TestJob = "policeMan" | "carMan" | "teacherMan";

interface User {
  // User 인터페이스를 만든다.
  name: string;
  // name은 string타입
  job: TestJob;
  // job은 TestJob타입을 선택
}

const user: User = {
  name: "hey",
  job: "carMan",
  // 여기서 job의 프로퍼티는 위에서 타입으로 설정한 TestJob이 가진 "policeMan" | "carMan" | "teacherMan" 이 3개중에서 선택을 하여 사용할 수 있다.
  // 만약 "policeMan" | "carMan" | "teacherMan" 이 3가지 외에 다른 내용이 들어가면 에러가 난다. 예) "passMan" 에러
};

// --- 03. 유니온(Union) 타입

interface HightScoolStudent {
  // HightScoolStudent 인터페이스를 만든다.
  name: number | string;
  // name은 number타입 | string타입
  grade: 1 | 2 | 3;
  // 여기서 1 | 2 | 3 사이에 있는 | <- 이것을 유니온이라고 부른다.
}

// --- 04. 식별 가능한 유니온(Union) 타입

interface Car {
  name: "car";
  color: string;
  start(): void;
}
interface Mobile {
  name: "mobile";
  color: string;
  call(): void;
}

function TestGetGift(gift: Car | Mobile) {
  // getGift함수에 매개변수인 gift에 인터페이스로 설정된 것을 유니온 타입으로 적용 할 수있다. Car | Mobile

  gift.start();
  // getGift함수의 매개변수 gift에 인터페이스로 설정된 것을 유니온 타입으로 적용 하였더라도 인식을 할 수없는 상황이다.
  // 왜냐면 인터페이스로 설정된 Car와 Mobile의 name과 color는 사용을 할 수 있지만, start()메서드는 Car는 가지고 있고 Mobile은 없는 상태다.
  // 그래서 gift.start()를 사용하기 위해서는 Mobile에도 start()가 있다던가 아니면 아래 getGift 함수 처럼 조건식(if문)을 사용하여 car인지 mobile인지 확인하여 설정하면 된다.
}

function getGift(gift: Car | Mobile) {
  // getGift함수에 매개변수인 gift에 인터페이스로 설정된 것을 유니온 타입으로 적용 할 수있다. Car | Mobile
  console.log(gift.color);
  if (gift.name === "car") {
    // 여기서 gift.name에 마우스를 올려 보면 name의 프로퍼티가 어떤 것인지 확인 할 수 있다.
    // gift.name은 interface로 설정한 Car의 name의 "car"이다. 그래서 interface로 설정한 Car에 속한 start() 메서드를 사용한다.
    gift.start();
  } else {
    // gift.name이 "car"가 아니면 유니온 타입으로 설정한 Mobile name의 "mobile"이니 interface로 설정한 Mobile에 속한 call()메서드를 사용한다.
    gift.call();
  }
  // 이때 검사할 항목이 많아지면 가독성을 위해 switch를 사용하는 것이 좋다.
}
// 이렇게 위와 같이 동일한 속성을 다르게 해서 구분할 수 있는 것을 식별가능한 유니온 타입이라고 한다.

// --- 05. 교차(Intersection) 타입

interface MyCar {
  name: string;
  start(): void;
}
interface MyToy {
  name: string;
  color: string;
  preice: number;
}
const toyCar: Toy & Car = {
  // 교차 타입은 Toy & Car에서 보듯 & 기호를 넣어서 사용한다.
  // & 기호를 넣어 교차타입으로 설정 할 때는 Mycar와 Mytoy의 속성들을 모두 넣어줘야 사용가능하다.
  // 교차 타입은 인터페이스로 설정한 MyCar, MyToy
  name: "야타",
  // name은 MyCar와 MyToy가 동일하게 가지고 있음.
  start() {},
  // start() 메서드는 MyCar만 가지고 있음
  color: "yellow",
  // color는 MyToy만 가지고 있음
  preice: 1000,
  // preice는 MyToy만 가지고 있음
};
// 교차 타입은 각 인터페이스로 설정한 기능을 하나로 합쳐주는 기능이다.

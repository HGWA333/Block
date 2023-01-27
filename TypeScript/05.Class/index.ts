// Typescript 클래스(Class) 타입 종류 : Public, Private, Protected

// 01. 접근 제한자 Public : 자식 클래스, 클래스 인스턴스 모드 접근 가능

class PublicCar {
  public name: string = "car";
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  start() {
    console.log("start");
  }
}

class PublicCarHonda extends PublicCar {
  constructor(color: string) {
    super(color);
  }
  showName() {
    console.log(super.name);
  }
}

// 02. 접근 제한자 Private : 해당 클래스 내부에서만 접근 가능

class PrivateCar {
  // private: string = "car";
  #name: string = "car";
  color: string;

  constructor(color: string) {
    this.color = color;
  }
  start() {
    console.log("start");
    console.log(this.#name);
  }
}

class PrivateHonda extends PrivateCar {
  constructor(color: string) {
    super(color);
  }
  showName() {
    console.log(super.name);
  }
}

// 03. 접근 제한자 Protected : 자식 클래스에서만 접근 가능

class ProtectedCar {
  protected name: string = "car";
  constructor(color: string) {
    this.color = color;
  }
  start() {
    console.log("start");
  }
}

class ProtectedHonda extends ProtectedCar {
  constructor(color: string) {
    super(color);
  }
  showName() {
    console.log(super.name);
  }
}

// 04. 읽기 전용 클래스 Readonly class

class ReadonlyCar {
  readonly name: string = "car";
  color: string;
  static wheels = 4;
  constructor(color: string, name) {
    this.color = color;
    this.name = name;
  }
  start() {
    console.log("start");
    console.log(this.name);
    // console.log(this.wheels);
    // static로 설정한 this.wheels는 정적메서드이다. 그래서 this.wheels 형태로 불러 올 수 없다.
    console.log(ReadonlyCar.wheels);
    // 이것을 불러오기 위해서는 ReadonlyCar.wheels 형태로 가져와야 한다.
  }
}

class ReadonlyHonda extends ReadonlyCar {
  constructor(color: string, name) {
    super(color, name);
  }
  showName() {
    console.log(super.name);
  }
}

// 05. 추상 클래스 abstract class

abstract class AbstractCar {
  private name: string = "car";
  constructor(public color: string) {
    this.color = color;
  }
  start() {
    console.log("start");
  }
  abstract heyMan(): void;
}

// const Car = new AbstractCar("red");
// 추상 클래스를 초기화 할 때는 위와 같은 형태로 new를 사용할 수 없다.

class AbstractHonda extends AbstractCar {
  constructor(color: string) {
    super(color);
  }
  heyMan() {
    console.log("AbstractHonda");
  }
}

// Typescript 클래스(Class) 타입

// 01. 접근 제한자 Public : 자식 클래스, 클래스 인스턴스 모드 접근 가능

class PublicCar {
  public name: string = "car";
  constructor(public color: string) {
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
  // #name: string = "car";
  private name: string = "car";

  constructor(public color: string) {
    this.color = color;
  }
  start() {
    console.log("start");
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
  constructor(public color: string) {
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
  constructor(public color: string) {
    this.color = color;
  }
  start() {
    console.log("start");
  }
}

class ReadonlyHonda extends ReadonlyCar {
  constructor(color: string) {
    super(color);
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
}

class AbstractHonda extends AbstractCar {
  constructor(color: string) {
    super(color);
  }
  showName() {
    console.log(super.name);
  }
}

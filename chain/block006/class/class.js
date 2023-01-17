class TestClass {
  #privateValue;
  constructor(_value) {
    this.#privateValue = _value;
  }
  get privateValue() {
    return this.#privateValue;
    // 보편적으로 #이 붙은 키를 가져올 때 사용 한다.
    // #을 붙인이유는 하나로 정의된 Class 내부에서만 사용이 가능하다.
    // get을 붙혔을 경우 privateValue는 privateValue()로 사용하지 않고 변수처럼 사용한다. privateValue 이렇게
  }
  set privateValue(_value) {
    this.#privateValue = _value;
  }

  add() {
    return this.#privateValue + this._value;
  }
  static add(a, b) {
    return a + b;
  }
}

class TestClass extends ParentTestClass {
  constructor(_value) {
    super(_value);
    // console.log(this.#privateValue);
    // 어떤 클래스에든 #로 정의(만듬)것은 constructor에서 상속 받을 수 없다.
  }
}

module.exports = { TestClass, ParentTestClass };

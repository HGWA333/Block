const TestClass = require("./class");

describe("Class Test", () => {
  it("private Test", () => {
    const test = new TestClass(5);
    expect(typeof test).toBe("object");

    ////////////////////////////////////////////////////////////
    // expect(test.#privateValue).toBe(5);
    //Class 내부에서 constructor로 바로 접근을 할 수 없어 get 만들어서 접근

    ////////////////////////////////////////////////////////////
    expect(test.privateValue).toBe(5);
    // 이것은 Class 내부에서 get으로 정의 한 것을 가져왔음

    ////////////////////////////////////////////////////////////
    test["#privateValue"] = 10;
    expect(test["#privateValue"]).toBe(10);
    // 이것은 describe 내부에서 생성 된 것 Class안에서 가져온 것이 아니다.

    ////////////////////////////////////////////////////////////
    test.privateValue = 200; // set 사용 여기서 바로 변환 됨
    expect(test.privateValue).toBe(200);
    // 이것은 Class 내부에서 set으로 정의 한 것을 가져왔음

    ///////////////////////////////////////////////////////
    expect(test.value).toBe(50);

    expect(test.add()).toBe(55);
    expect(TestClass.add(1, 2)).toBe(3);
    // Static 사용
  });

  //   it("a", () => {});
  //   it("a", () => {});
  //   it("a", () => {});
  //   it("a", () => {});
  //   it("a", () => {});
  //   it("a", () => {});
  //   it("a", () => {});
  //   it("a", () => {});
  //   it("a", () => {});
});

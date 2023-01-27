// Typescript 유틸리티(Utility) 타입

// ----- 01. keyof : KeyUser의 프로퍼티 id, name, age, gender를 사용할 수 있다.

interface KeyUser {
  id: number;
  name: string;
  age: number;
  gender: "m" | "f";
}

type UserKey = keyof KeyUser; // keyof User의 형태는 'id' | 'name' |'age' |'gender' |

const uk: UserKey = "name";
// uk: UserKey는 KeyUser의 프로퍼티 id, name, age, gender를 사용할 수 있다.

// ----- 02. Partial<t> : 프로퍼티를 일부 선택하여 사용이 가능

interface PartialUser {
  id: number;
  name: string;
  gender: string | string;
}

let PartialAdmin: Partial<PartialUser> = {
  id: 1,
  name: "abc",
};

// interface PartialUser {
// id: number;
// name: string;
// gender: string | string;
// } PartialUser안의 프로퍼티 일부를 선택하여 사용이 가능

// ----- Required<t> : 인터페이스 RequiredUser안에 있는 프로퍼티 id, age, gender 모두 들어가져 있어야 사용이 가능

interface RequiredUser {
  id: string;
  age?: number;
  gender: "m" | "f";
}

let Required: Required<RequiredUser> = {
  id: "호호호",
  age: 12,
  gender: "m",
};

// ----- Readonly<t> : 첫 인터페이스 설정할 때 처음 할당 값만 사용이 가능하다. 뜻 그대로 읽기전용
interface ReadonlyUser {
  id: number;
  gender: "m" | "f";
}

let ReadonlyAdmin: Readonly<ReadonlyUser> = {
  id: 1,
  gender: "m",
};

ReadonlyAdmin.id = 4;
// 처음에 할당한 id:1 값만 사용이 가능하고  이후 수정이 불가하다.

// ----- Record<K, T>

interface TestScore {
  "1": "A" | "B" | "C" | "D";
  "2": "A" | "B" | "C" | "D";
  "3": "A" | "B" | "C" | "D";
  "4": "A" | "B" | "C" | "D";
}

const Testsocre: TestScore = {
  1: "A",
  2: "C",
  3: "B",
  4: "D",
};

type Grade = "1" | "2" | "3" | "4";
type Score = "A" | "B" | "C" | "D";
const socre: Record<Grade, Score> = {
  1: "A",
  2: "C",
  3: "B",
  4: "D",
};

interface RecordUser {
  id: number;
  name: string;
  age: number;
}

function isValid(_user: RecordUser) {
  const result: Record<keyof RecordUser, boolean> = {
    id: _user.id > 0,
    name: _user.name !== "",
    age: _user.age > 0,
  };
  return result;
  // Record<keyof RecordUser>는 RecordUser의 키로 id, name, age를 사용한다. 그리고
  // Record<keyof RecordUser, boolean> boolean이 붙으면  id, name, age 값은 boolean으로 설정을 한다.
}

// ----- Pick<T, K> : <T, K>  T = 인터페이스 PickUser , K = "프로퍼티"
// Pick<PickUser, "id" | "name">는 PickUser의 프로퍼티 id와 name만 가져다 사용을 하겠다.
// Pick 뜻 그대로 필요한 프로퍼티만 선택하는 것.

interface PickUser {
  id: number;
  name: string;
  age: number;
  gender: "M" | "W";
}

const PickAdmin: Pick<PickUser, "id" | "name"> = {
  id: 9,
  name: "hey",
};

// ----- Omit<T, K> : 사용방식이 위 Pick과 비슷하다. Pick과 다른 점은 선택한 프로퍼티들을 제외한다는 점.
// Omit<OmitUser, "id" | "name">는 PickUser의 프로퍼티 id와 name를 제외한 나머지 프로퍼티들을 모두 사용하겠다라는 의미.

interface OmitUser {
  id: number;
  name: string;
  age: number;
  gender: "m" | "f";
}

const OmitAdmin: Omit<OmitUser, "age" | "gender"> = {
  id: 9,
  name: "hey",
};

// ----- Exclude<T1, T2> : T1 프로퍼티와 T2프로퍼티 타입을 비교하여 겹치는 것을 제외하여 사용하는 기능

type T1 = string | number | boolean;
type T2 = Exclude<T1, number | string>;
// 위 상황의 T2는 T1과 T2중 겹치는 number와 string을 제외한 T1의 boolean만 남게된다.
// T1 [string | number | boolean] - T2 [number | string] = T2 [boolean]
// T1은 [string | number | boolean] 모두 가지고 있는 상태

// ----- NonNullable<Type> : Exclude와 같은 방식으로 null 값을 제외한 나머지를 N2에 넣는다.

type N1 = string | null | undefined | void;
type N2 = NonNullable<N1>;

// N1 [string | null | undefined | void] - N2 [NonNullable] = N2 [string | undefined | void]

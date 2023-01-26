// Typescript 유틸리티(Utility) 타입

// ----- keyof

interface KeyUser {
  id: number;
  gender: "m" | "f";
}

type UserKey = keyof User;

const uk: UserKey = "age";

// ----- Partial<t>

interface PartialUser {
  id: number;
  gender: "m" | "f";
}

let PartialAdmin: Partial<PartialUser> = {
  id: 1,
};

// ----- Required<t>

interface RequiredUser {
  id: number;
  gender: "m" | "f";
}

let Required: Required<RequiredUser> = {
  id: 1,
  gender: "m",
};

// ----- Readonly<t>
interface ReadonlyUser {
  id: number;
  gender: "m" | "f";
}

let ReadonlyAdmin: Readonly<ReadonlyUser> = {
  id: 1,
  gender: "m",
};

ReadonlyAdmin.id = 4;

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
}

function isValid(_user: RecordUser) {
  const result: Record<keyof RecordUser, boolean> = {
    id: _user.id > 0,
    name: _user.name !== "",
  };
  return result;
}

// ----- Pick<T, K>

interface PickUser {
  id: number;
  name: string;
}

const PickAdmin: Pick<PickUser, "id" | "name"> = {
  id: 9,
  name: "hey",
};

// ----- Omit<T, K>

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

// ----- Exclude<T1, T2>

type T1 = string | number | boolean;
type T2 = Exclude<T1, number | string>;

// ----- NonNullable<Type>

type N1 = string | null | undefined | void;
type N2 = NonNullable<N1>;

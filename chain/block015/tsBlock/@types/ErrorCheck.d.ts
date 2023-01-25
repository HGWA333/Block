declare type TError<R> = {
  // <R> 는 타입을 가져다 사용(호출)할 때 어떤 타입인지 받는다.
  // R을 제네릭(Generics)이라 부른다. 타입에서의 매개변수식으로 사용
  isError: true;
  msg: R;
};
declare type TResult<T> = {
  // <T> 는 타입을 가져다 사용(호출)할 때 어떤 타입인지 받는다.
  isError: false;
  msg: T;
};

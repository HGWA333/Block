declare type TError<_R> = {
  isError: true;
  msg: _R;
};

declare type TValue<_T> = {
  isError: false;
  value: _T;
};

declare type TResult<_T, _R> = TValue<_T> | TError<_R>;
// 두 결과를 하나로 합치는 기능
//  TValue<T> 또는  TError<U>가 나오는 type을 설정한다.

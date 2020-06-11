//Partial
interface Foo {
  bar: string;
  baz: number;
}

type PartialFoo = Partial<Foo>;

//PartialFoo = {
//  bar?: string;
//  baz?: number;
//}

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "a",
  description: "b",
};

const todo2 = updateTodo(todo1, {
  description: "c",
});

//Required
type Hoge = {
  name?: string;
  age?: number;
};

type RequiredA = Required<Hoge>;

//Pick(nameの取得)
type Picked = Pick<Hoge, "name">;

//Omit(ageの省略)
type Omited = Omit<Hoge, "age">;

//
const user = {
  name: "kengi", //string
  age: 98, //number
};

interface Part {
  name: string;
  age: number;
  add(): number;
}

//メソッド名だけ取り出した型
const obj = {
  name: "kengi",
  age: 98,
  add: () => 1 + 2,
};

type FunctionProperyNames<T> = {
  //T[K]はK型でアクセスして得られるtype
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T]; //keyofはすでに許可されているプロパティのタイプを生成

type result = FunctionProperyNames<Part>;

//never 絶対にreturnされない関数 常にthrowされる関数
function foo(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }
  return fail("Unexhaustive!");
}
function fail(message: string): never {
  throw new Error(message);
}
const bool = true;
if (bool) {
  const a = bool; //boolean
} else {
  const b = bool; //never
}

//
interface Something<T> {
  id: number;
  //この時点ではTは決定していない
  flag: T;
}
//Tにbooleanが付与されると自動的にbooleanが決定する
const something1: Something<boolean> = { id: 1, flag: true };

//マッチした際にその部分に推論される型をRにキャプチャする
//...args: any[]関数なら何でも可
type ReturnType2<T> = T extends (...args: any[]) => infer R ? R : any;

//非同期の中身
type ResolvedType<T> = T extends Promise<infer R>
  ? R
  : T extends Observable<infer R>
  ? R
  : T;

//Nullableな型
type PropNullable<T> = { [P in keyof T]: T[P] | null };
interface User {
  name: string;
  age: number;
  money: null;
}
const obj1: PropNullable<User> = { name: "kengi", age: 88, money: null };

//createObj型を定義
let createObj = <T extends unknown>(obj: T) => {
  let o = {} as { [P in keyof T]: string };
  for (const key in obj) {
    o[key] = String(obj[key]);
  }
  return 0;
};
const anotherFun = createObj;

//union型　複数の方を | で繋げた型

//どんな要素の配列が渡されてもいいような型を作る
let arr = <T extends any[]>(...rest: T) => {
  return rest;
};

arr(["a", 1]);

//
let a = 1;
// ""| "hoge"
const num = a && "hoge";

//Taple
let x: [string, number];
x = ["hello", 3];
//x = [10, "hello"]; error

//Enum 列挙
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Blue;
console.log(c); //3

//undefined:意味がない void:無視して

//! null undefined ではない

//
interface Fun {
  (e: number): number;
}

function fa(callback: Fun, e: number) {
  return callback(e);
}

const fun = (e) => 1 * e;
const v = fa(fun, 1);

//
let arr1: (string | null)[] = [];

//
type F = {
  foo: string;
  bar: number;
};
const E: Record<keyof F, string> = { foo: "fafa", bar: "fafa" };

//TがUに代入可能ならnever、そうでない場合T
type Q = Exclude<string | number, boolean | string | number>

//Interaction Type

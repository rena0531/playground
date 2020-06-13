// https://qiita.com/uhyo/items/e4f54ef3b87afdd65546
//
function isPositive(num: number): boolean {
  return num >= 0;
}

// 使用例
isPositive(3);

//
type User1 = {
  name: string;
  age: number;
  private: boolean;
};

function showUserInfo(user: User1) {
  // 省略
}

// 使用例
showUserInfo({
  name: "John Smith",
  age: 16,
  private: false,
});

//
type IsPositiveFunc = (num: number) => boolean;

const isPositive1: IsPositiveFunc = (num) => num >= 0;

// 使用例
isPositive(5);

//
function sumOfPos(arr: number[]) {
  return arr.filter((num) => num >= 0).reduce((acc, num) => acc + num, 0);
}

// 使用例
const sum: number = sumOfPos([1, 3, -2, 0]);

//
function myFilter<T>(arr: T[], predicate: (elm: T) => boolean): T[] {
  const result = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
}

// 使用例
const res = myFilter<number>([1, 2, 3, 4, 5], (num) => num % 2 === 0);
const res2 = myFilter<string>(["foo", "hoge", "bar"], (str) => str.length >= 4);

//
type Speed = "slow" | "medium" | "fast";

function getSpeed(speed: Speed): number {
  switch (speed) {
    case "slow":
      return 10;
    case "medium":
      return 50;
    case "fast":
      return 200;
  }
}

// 使用例
const slowSpeed = getSpeed("slow");
const mediumSpeed = getSpeed("medium");
const fastSpeed = getSpeed("fast");

//
interface addEventListenerOptions {
  capture?: boolean;
  once?: boolean;
  excess?: boolean;
}
declare function addEventListener(
  str: string,
  handler: () => void,
  option?: boolean | addEventListenerOptions
): void;
// 使用例
addEventListener("foobar", () => {});
addEventListener("event", () => {}, true);
addEventListener("event2", () => {}, {});
addEventListener("event3", () => {}, {
  capture: true,
  once: false,
});

//

function giveId<T>(obj: T): T & { id: string } {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id,
  };
}

// 使用例
const obj3: {
  id: string;
  foo: number;
} = giveId({ foo: 123 });
const obj4: {
  id: string;
  num: number;
  hoge: boolean;
} = giveId({
  num: 0,
  hoge: true,
});

//
type UseStateUpdateArg<T> = T | ((oldValue: T) => T);
declare function useState<T>(
  initialValue: T
  //タプル型　var nameNumber: [string, number];
): [T, (updator: UseStateUpdateArg<T>) => void];
// 使用例
// number型のステートを宣言 (numStateはnumber型)
const [numState, setNumState] = useState(0);
// setNumStateは新しい値で呼び出せる
setNumState(3);
// setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
setNumState((state) => state + 10);

// 型引数を明示することも可能
const [anotherState, setAnotherState] = useState<number | null>(null);
setAnotherState(100);

//
//K extends keyof T ->Tがもつプロパティ名いずれかの型
function mapFromArray<T, K extends keyof T>(arr: T[], key: K): Map<T[K], T> {
  const result = new Map();
  for (const obj of arr) {
    result.set(obj[key], obj);
  }
  return result;
}

// 使用例
const data = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Mary Sue" },
  { id: 100, name: "Taro Yamada" },
];
const dataMap = mapFromArray(data, "id");

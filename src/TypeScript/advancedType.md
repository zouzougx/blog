## 高级类型

链接: https://mp.weixin.qq.com/s/yzdeYmlkszplTPAeyixaBQ

### 交叉类型(&)

将多个类型合并成一个类型

```js
interface Button {
    type: string
    text:string
}
interface Link {
    alt: string
    href: string
}

const linkButton: Link & Button = {
    type: 'danger',
    text: '跳转到百度',
    alt: '跳转到百度',
    href: 'http://www.baidu.com'
}
```

### 联合类型(|)

类型为多个类型中的任意一个

```js
declare let  APP_DEV: 'dev1' | 'dev2' | 'dev3'
```

### 类型别名(type)

把交叉类型和联合类型命名以供在多个地方使用

```js
interface Button {
    btnType: InnerType,
    text: string
}
interface Link {
    alt: string
    href: string
}
type LinkButtonType = Link & Button
type InnerType = 'default' | 'primary' | 'danger'

const linkButton:LinkButtonType= {
    btnType: 'danger',
    text: 'text word',
    alt: 'alt word',
    href: 'http://www.baidu.com'
}

```

### 类型索引（keyof）

获取接口中 key 的联合类型

```js
interface SearchCustomerIdParams  {
    customerType: string;
    idNo: string;
    insureId: string;
    planId: string;
};

type SearchCustomerIdParamsKeys = keyof (SearchCustomerIdParams)
// 等效于
// type SearchCustomerIdParamsKeys = 'customerType'| 'idNo'| 'insureId'| 'planId'
const setKey : SearchCustomerIdParamsKeys = 'customerType'
//例2
interface ButtonStyle {
    color: string;
    width: string
}
interface ButtonType {
    default: ButtonStyle
    primary: ButtonStyle
    danger: ButtonStyle
}
interface Button {
    type: 'default' | 'primary' | 'danger'
    text:string
}
// 使用类型索引
interface Button {
    type: keyof ButtonType,
    text:string
}

```

### 类型约束（extends）

1. 泛型内使用主要是对泛型加以约束

```js
type BaseType =  number  | boolean
const copy = <T extends BaseType>(args: T): T => {
    if (typeof (args) === 'object') {
        return JSON.parse(JSON.stringify(args))
    } else {
        return args
    }
}
//只能接收数字和布尔类型的参数
let strFromCopy = copy<number>(1)
strFromCopy = copy(2)

```

2. extends 和 key 一起使用, 获取对象的值时,这个对象并不确定

```js
const getValue = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key];
  };
  const obj = { a: 1 };
  const a = getValue(obj, 'a');
```

### 类型映射（in）

遍历已有接口的 key 或者遍历联合类型

1.

```js
interface obj {
    a: string;
    b: string;
  }
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  type readOnlyObj = Readonly<obj>;
// 结果readOnlyOb
interface ReadOnlyObj {
    readonly a: string;
    readonly b: string;
}
```

### 条件类型（U?X:Y）

`T extends U ? X : Y`如果 T 是 U 的子集，就是类型 X，否则为类型 Y。

1. Extract
   如果 T 中的类型在 U 存在，则返回，否则抛弃
   提取这三个公共属性。  
   `type Extract<T, U> = T extends U ? T : never;`
   ```js
   interface Worker {
    name: string;
    age: number;
    email: string;
    salary: number;
   }
   interface Student {
    name: string;
    age: number;
    email: string;
    grade: number;
   }
   //CommonKeys 是'name' | 'age' | 'email'
   type CommonKeys = Extract<keyof Worker, keyof Student>;
   ```
2. Exclude  
    如果 T 中的类型在 U 不存在,则返回,否则则抛弃  
   `type Exclude<T, U> = T extends U ? never : T`
   ```js
    //CommonKeys 是'salary’
   type CommonKeys = Exclude<keyof Worker, keyof Student>;
   ```

### 工具泛型

### 1. Partial

将接口的所有属性设置成可选状态

```js
type Partial<T> = {
 [P in keyof T]?: T[P];
};
```

```js

   import React from 'react'
   interface ButtonProps {
   type: 'button' | 'submit' | 'reset'
   text: string
   disabled: boolean
   onClick: () => void
   }

// 将按钮组件的 props 的属性都改为可选
const render = (props: Partial<ButtonProps> = {}) => {
const baseProps = {
disabled: false,
type: 'button',
text: 'Hello World',
onClick: () => {},
}
const options = { ...baseProps, ...props }
return (
<button
      type={options.type}
      disabled={options.disabled}
      onClick={options.onClick}>
{options.text}
</button>
)
}

```

### 2. Required

Required 与 Partial 相反,将接口中所有可选属性改为必须的， 区别在于`？`替换成了 `-?`'

```js
  type Required<T> = {
    [P in keyof T]-?: T[P];
  };
```

### 3. Pick

提取接口中的某几个属性

```js
type Pick<T, K extends keyof T>= {
    [P in K]: T[P]
}
```

```js
interface ToDo {
  title: string;
  description: string;
  complete: string;
}
type TodoPreview = Pick<ToDo, 'title' | 'complete'>;
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

### 4. omit

```js
type omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>
```

`Exclude<keyof T, K>`去除 T 中存在,K 中不存在的属性,然后由这些属性通过 Pick 构造一个新的类型

```js
//TodoPreview 类型也是只有title， completed属性
type TodoPreview = Omit<Todo, 'description'>;
```

### 高级类型

### 交叉类型(&)

`将多个类型合并成一个类型`

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

`类型为多个类型中的任意一个`

```js
declare let  APP_DEV: 'dev1' | 'dev2' | 'dev3'
```

### 类型别名(type)

`把交叉类型和联合类型命名以供在多个地方使用`

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

`获取接口中key的联合类型`

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

`1. 泛型内使用主要是对泛型加以约束`

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

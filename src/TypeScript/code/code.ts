type BaseType = number | boolean;
const copy = <T extends BaseType>(args: T): T => {
  if (typeof args === 'object') {
    return JSON.parse(JSON.stringify(args));
  } else {
    return args;
  }
};
let strFromCopy = copy<number>(1);
strFromCopy = copy(2);

let APP_DEV: 'dev1' | 'dev2' | 'dev3';

interface Button {
  btnType: InnerType;
  text: string;
}
interface Link {
  alt: string;
  href: string;
}
type LinkButtonType = Link & Button;
type InnerType = 'default' | 'primary' | 'danger';

const linkButton: LinkButtonType = {
  btnType: 'danger',
  text: '跳转到百度',
  alt: '跳转到百度',
  href: 'http://www.baidu.com',
};

interface SearchCustomerIdParams {
  customerType: string;
  idNo: string;
  insureId: string;
  planId: string;
}

type SearchCustomerIdParamsKeys = keyof SearchCustomerIdParams;
// 等效于
// type SearchCustomerIdParamsKeys = 'customerType'| 'idNo'| 'insureId'| 'planId'
const setKey: SearchCustomerIdParamsKeys = 'customerType';

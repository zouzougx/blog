import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  SchemaForm,
  SchemaMarkupField as Field,
  FormButtonGroup,
  createFormActions,
  createAsyncFormActions,
  FormEffectHooks,
  Submit,
  Reset,
} from '@formily/antd'; // 或者 @formily/next
import { Input, Select } from '@formily/antd-components';
import 'antd/dist/antd.css';
import schema from './schema';
import { merge, combineLatest } from 'rxjs';
const {
  onFieldValueChange$,
  onFieldInputChange$,
  onFieldInit$,
} = FormEffectHooks;

const actions = createAsyncFormActions();
const App = () => {
  const chainEffects = () => {
    const { setFieldState } = createFormActions();
    /*onFieldValueChange和onFieldInputChange的区别*/

    // onFieldValueChange$('aa').subscribe(({ value }) => {
    //    console.log('aa 的 onFieldValueChange')
    //     setFieldState('*(bb,cc)', state => {
    //       state.visible = value
    //     })
    //  })

    /*当a没有初始值时 我们也想隐藏c,onFieldValueChange时不行的*/

    // onFieldInputChange$('aa').subscribe(({ value }) => {
    //     console.log('aa 的 onFieldInputChange')
    //     setFieldState('*(bb,cc)', state => {
    //       state.visible = value
    //     })
    //  })
    //  onFieldInit$('aa').subscribe(({ value }) => {
    //      console.log('aa 的 onFieldInit')
    //     setFieldState('*(bb,cc)', state => {
    //       state.visible = value
    //     })
    //  })
    /*rxjs的写法 */
    // merge(onFieldInputChange$('a'), onFieldInit$('a')).subscribe(
    //     ({ value }) => {
    //         setFieldState('*(b,c)', state => {
    //         state.visible = value
    //       })
    //     },
    // );

    /*a是visible b是a是visible c才显示*/
    //  onFieldInputChange$('a').subscribe(async({ value }) => {
    //     const bValue = await actions.getFieldValue('b');
    //       setFieldState('c', state => {
    //         state.visible = value&&bValue
    //       })
    //  })
    //  onFieldInputChange$('b').subscribe(async({ value }) => {
    //     const bValue = await actions.getFieldValue('a');
    //       setFieldState('c', state => {
    //         state.visible = value&&bValue
    //       })
    //  })
    //   onFieldInit$('a').subscribe(async({ value }) => {
    //     const bValue = await actions.getFieldValue('b');
    //       setFieldState('c', state => {
    //         state.visible = value&&bValue
    //       })
    //  })
    //  onFieldInit$('b').subscribe(async({ value }) => {
    //     const bValue = await actions.getFieldValue('a');
    //       setFieldState('c', state => {
    //         state.visible = value&&bValue
    //       })
    //  })
    /*rxjs的写法*/
    //a和b同时有初始值时
    // combineLatest([
    //       onFieldValueChange$('a'),
    //       onFieldValueChange$('b'),
    //    ]).subscribe(([{ value: aValue }, { value:bValue }]) => {
    //    setFieldState('c', state => {
    //         state.visible = aValue&&bValue
    //     })
    // });
    //其他情况
    combineLatest([
      merge(onFieldInputChange$('a'), onFieldInit$('a')),
      merge(onFieldInputChange$('b'), onFieldInit$('b')),
    ]).subscribe(([{ value: aValue }, { value: bValue }]) => {
      setFieldState('c', state => {
        state.visible = aValue && bValue;
      });
    });
  };
  return (
    <SchemaForm
      initialValues={{ a: true, b: true }}
      components={{ Input, Select }}
      onSubmit={values => {
        console.log(values);
      }}
      actions={actions}
      schema={schema}
      effects={() => {
        chainEffects();
      }}
    ></SchemaForm>
  );
};

export default App;

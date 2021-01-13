### 转换操作符

### map

`map --- 将源observable发出的每个值应用投射函数project， 并将结果值作为observable发出`

<code src="../code/operators/conversion/map.tsx"></code>

### reduce

`reduce --- 在源Observable 上应用应用累加器函数， 当源Observable完成时， 发出累加结果`

<code src="../code/operators/conversion/reduce.tsx"></code>

### scan

`scan --- 对源数据流使用累加器函数， 返回生成的中间值`

<code src="../code/operators/conversion/scan.tsx"></code>

### mapTo

`mapTo ---将每个发出的值映射成常量, 将映射后的常量作为observable发出`

<code src="../code/operators/conversion/mapTo.tsx"></code>

### mergeMap

`mergeMap --- 将每个源值投射成Observable， 并将值合并到输入流中`

<code src="../code/operators/conversion/mergeMap.tsx"></code>

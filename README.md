# el-tree-column

> 使用高阶组件( HOC )的概念，封装 el-table-column，用于实现树的展开搜索功能

- Done

1. 收缩展开功能
2. 记录展开状态
3. 实现 defaultExpand 属性( 初始化默认展开指定行 )

- Todo

1. 实现 defaultExpandAll 属性 ( 初始化默认展开所有行 )
2. 实现 expandAll 方法 ( 调用展开所有行 )
3. 实现 shrinkAll 方法 ( 调用收缩所有行 )
4. 实现 getExpanded 方法 ( 获取当前展开行的 id )

- 基本使用

```html
<el-table :data="treeData" border height="50vh">
  <el-tree-column label="id" prop="id"></el-tree-column>
  <el-table-column label="pid" prop="pid"></el-table-column>
  <el-table-column label="操作">
    <template>
      <i class="demo-icon el-icon-edit">编辑</i>
      <i class="demo-icon el-icon-delete">删除</i>
      <i class="demo-icon el-icon-share">分享</i>
    </template>
  </el-table-column>
</el-table>
```

- Attributes

| 参数          | 说明                        | 类型  | 可选值 | 默认值 |
| ------------- | --------------------------- | ----- | ------ | ------ |
| ......        | 同 el-table-column 所有属性 | -     | -      | -      |
| defaultExpand | 默认展开行                  | Array | -      | -      |

---

- Event

| 参数   | 说明                        | 类型 | 可选值 | 默认值 |
| ------ | --------------------------- | ---- | ------ | ------ |
| ...... | 同 el-table-column 所有事件 | -    | -      | -      |

---

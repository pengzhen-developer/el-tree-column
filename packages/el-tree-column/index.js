import ElTreeColumn from './src/el-tree-column.js'

// 为组件提供 install 安装方法，按需引入
ElTreeColumn.install = function(Vue) {
  Vue.component(ElTreeColumn.name, ElTreeColumn)
}

// 默认导出组件
export default ElTreeColumn

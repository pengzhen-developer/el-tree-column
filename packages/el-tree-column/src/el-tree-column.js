/*
 * @Author: PengZhen 
 * @Date: 2019-03-21 15:28:23 

 * @Description: 
 * 使用高阶组件( HOC )的概念，封装 el-table-column，用于实现额外功能：
 * 1. 收缩展开功能
 * 2. 记录展开状态
 * 3. 实现 defaultExpand 属性( 初始化默认展开指定行 )

 * TODO:
 * 1. 实现 expandAll 属性 ( 初始化初始化默认展开所有 )
 * 2. 实现 getExpanded 方法( 获取当前所有的展开行，用于重新获取数据后的状态还原 )

 * @Last Modified by: PengZhen
 * @Last Modified time: 2019-03-22 15:24:49
 */

import { TableColumn } from 'element-ui'
import './el-tree-column.css'

const methods = {
  arrowClass(scope) {
    if (scope.row.children && scope.row.children.length > 0) {
      if (scope.row.expanded) {
        return 'el-icon-remove-outline'
      } else {
        return 'el-icon-circle-plus-outline'
      }
    } else {
      return 'el-icon-document'
    }
  },

  doExpand({ row, store }) {
    if (row.children && row.children.length > 0) {
      const tableData = store.states.data
      const index = tableData.findIndex(item => item.id === row.id)
      tableData.splice(index + 1, 0, ...row.children)

      row.children.forEach(child => {
        if (child.expanded) {
          methods.doExpand({ row: child, store })
        }
      })

      row.expanded = true
    }
  },

  doShrink({ row, store }, deep = false) {
    if (row.children && row.children.length > 0) {
      row.children.forEach(child => {
        const tableData = store.states.data
        const index = tableData.findIndex(item => item.id === child.id)

        if (index !== -1) {
          tableData.splice(index, 1)
        }

        methods.doShrink({ row: child, store }, true)
      })

      if (!deep) {
        row.expanded = false
      }
    }
  },

  // 触发 [收缩 / 展开] 行
  toggleExpandRow(scope) {
    if (!scope.row.expanded) {
      methods.doExpand(scope)
    } else {
      methods.doShrink(scope)
    }
  },

  flatten(arr) {
    return arr.reduce(function(prev, next) {
      prev = prev.concat(next)

      if (Array.isArray(next.children)) {
        return prev.concat(methods.flatten(next.children))
      } else {
        return prev
      }
    }, [])
  }
}

export default {
  name: 'el-tree-column',

  props: {
    ...TableColumn.props,

    expandAll: {
      type: Boolean,
      default: function() {
        return false
      }
    },

    defaultExpand: {
      type: Array,
      default: function() {
        return [1]
      }
    }
  },

  data() {
    return {}
  },

  watch: {
    defaultExpand: {
      handler() {
        /* eslint-disable */
        const tableDataList = methods.flatten(this.$parent.data)

        const _defaultExpandOne = this.defaultExpand.concat([])
        const _defaultExpandTwo = this.defaultExpand.concat([])

        // 双层循环，确保每一个 defaultExpand 的值，都能在 tableList 上找到父节点
        // 举例:
        // treeData = [{ id: 1, children: [{ id: 11, children: [{ id: 111, chidlren: { id: 1111 } }] }] }]
        // defaultExpand = [1111, 111, 11]
        // 单层循环中，只有 11 会挂载到 treeData 上
        _defaultExpandOne.forEach(() => {
          _defaultExpandTwo.forEach((id, index) => {
            const currentRow = tableDataList.find(item => item.id === id)

            currentRow.expanded = true

            let parentDataIndex = this.$parent.data.findIndex(item => item.id === currentRow.id)

            if (parentDataIndex !== -1 && Array.isArray(currentRow.children)) {
              // currentRow.children.forEach(item => (item.expanded = true))
              this.$parent.data.splice(parentDataIndex + 1, 0, ...currentRow.children)

              _defaultExpandTwo.splice(index, 1)
            }
          })
        })
      },
      immediate: true
    }
  },

  created() {},

  render(h) {
    return h(TableColumn, {
      props: this.$props,
      attrs: this.$attrs,
      on: this.$listeners,
      scopedSlots: {
        ...this.$scopedSlots,

        default: function(scope) {
          return (
            <div
              class="el-table-tree-column"
              style={{ 'padding-left': (scope.row.deep - 1) * 24 + 'px' }}
              on-click={() => {
                methods.toggleExpandRow(scope)
              }}
            >
              <i class={['el-table-tree-column-icon', methods.arrowClass(scope)]} />
              <span class="el-table-tree-column-span">{scope.row[scope.column.property]}</span>
            </div>
          )
        }
      }
    })
  }
}

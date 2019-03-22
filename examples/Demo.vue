<template>
  <div class="demo" id="app">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-alert :closable="false" title="展开指定项" type="warning"></el-alert>
        <el-table :data="treeData1" border height="50vh">
          <el-tree-column :defaultExpand="defaultExpand" label="id" prop="id"></el-tree-column>
          <el-table-column label="pid" prop="pid"></el-table-column>
          <el-table-column label="操作">
            <template>
              <i class="demo-icon el-icon-edit">编辑</i>
              <i class="demo-icon el-icon-delete">删除</i>
              <i class="demo-icon el-icon-share">分享</i>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-alert :closable="false" title="展开所有项" type="warning"></el-alert>
        <el-table :data="treeData2" border height="50vh">
          <el-tree-column :defaultExpand="defaultExpandAll" label="id" prop="id"></el-tree-column>
          <el-table-column label="pid" prop="pid"></el-table-column>
          <el-table-column label="操作">
            <template>
              <i class="demo-icon el-icon-edit">编辑</i>
              <i class="demo-icon el-icon-delete">删除</i>
              <i class="demo-icon el-icon-share">分享</i>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
const defaultExpandAll = []

const mockData = function() {
  const treeData = []

  // 模拟三层，总计 100 条数据
  // 默认展开 2 层，总计展示 100 条数据
  for (let i = 0; i < 10; i++) {
    const iData = {
      id: 'i' + i,
      pid: null,
      deep: 1,
      children: []
    }

    for (let j = 0; j < 5; j++) {
      const jData = {
        id: 'j' + i + j,
        pid: 'i' + i,
        deep: 2,
        children: []
      }

      for (let k = 0; k < 2; k++) {
        const kData = {
          id: 'k' + i + j + k,
          pid: 'j' + i + j,
          deep: 3
        }

        jData.children.push(kData)
      }

      iData.children.push(jData)
      defaultExpandAll.push('j' + i + j)
    }

    treeData.push(iData)
    defaultExpandAll.push('i' + i)
  }

  return treeData
}

export default {
  name: 'app',

  data() {
    return {
      treeData1: mockData(),
      treeData2: mockData(),

      defaultExpand: ['i0'],
      defaultExpandAll: []
    }
  },

  created() {
    this.defaultExpandAll = this.getDefaultExpandAll()
  },

  methods: {
    getDefaultExpandAll() {
      const flatten = arr => {
        return arr.reduce(function(prev, next) {
          prev = prev.concat(next)

          if (Array.isArray(next.children)) {
            return prev.concat(flatten(next.children))
          } else {
            return prev
          }
        }, [])
      }

      const listData = flatten(this.treeData2)

      return listData.map(item => item.id)
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  margin: 0;
  padding: 0;
}

.demo-icon {
  color: #606266;
  margin: 0 20px;
  vertical-align: middle;
}
</style>

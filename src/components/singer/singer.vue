<template lang="html">
  <div>
    <list-view :data="singers"></list-view>
  </div>

</template>

<script type="text/ecmascript-6">
import {
  getSingerList
} from 'api/singer'
import {
  ERR_OK
} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'

const HOTE_NAME = "热门"
const HOTE_SINGERS_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code == ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOTE_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOTE_SINGERS_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // console.log("map",map)
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      // console.log("ret", ret)
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    }
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    postion: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

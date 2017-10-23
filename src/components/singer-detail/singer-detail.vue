<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  computed: {
    title (){
      return this.singer.name
    },
    bgImage(){
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  data(){
    return{
      songs: []
    }
  },
  created() {
    this._getDetail()
    console.log(this.singer)
  },
  components: {
    MusicList
  },
  methods: {
    _getDetail(){
      //没有singer则退回
      if(!this.singer.id){
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res)=>{
        if(res.code ==ERR_OK){
          // console.log(res.data.list);
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs);

        }
      })
    },
    _normalizeSongs(list){

      let ret = []
      list.forEach((item)=>{
        let {musicData} = item
        // console.log("musicData",musicData);
        if(musicData.songid && musicData.albumid) {
          // console.log('createSong()',createSong(musicData));
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"


.slide-enter-active,.slide-leave-active
  transition: all 0.3s

.slide-enter,.slide-leave-to
  transform:translate3d(100%,0,0)

</style>

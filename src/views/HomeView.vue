<script>
import { songsCollection, auth } from '@/includes/firebase'
import AppSongItem from '@/components/SongItem.vue'
import IconSecondary from '@/directives/icon-secondary'

export default {
  name: 'HomeView',
  components: {
    AppSongItem
  },
  directives: {
    'icon-secondary': IconSecondary
  },
  data() {
    return {
      songs: [],
      maxPerPage: 10,
    }
  },
  async created() {
    this.getSongs()

   window.addEventListener('scroll', this.handleScroll) //scrolling through offsetHeight page
  },
  beforeUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods:{
    handleScroll() { // load more songs by scrolling
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

      if (bottomOfWindow) {
        this.getSongs()
        console.log("bottomOfWindow")
      }
    },
  async getSongs() {
      if (this.pendingRequest) {
        return
      }

      this.pendingRequest = true
      let snapshot;

      if (this.songs.length) {
      const lastDoc = await songsCollection
        .doc(this.songs[this.songs.length - 1].docID)
        .get()
      snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid)
        // .orderBy('modified_name')
        .startAfter(lastDoc)
        .limit(this.maxPerPage)
        .get()
      } else {
      snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid)
        // .orderBy('modified_name')
        .limit(this.maxPerPage)
        .get()
      }
    snapshot.forEach(document => {
      // const song = {
      //   ...document.data(),
      //   docID: document.id,
      // }
      this.songs.push({
        docID: document.id,
        ...document.data(),
      })
    });
      this.pendingRequest = false
  },

},
}
</script>

<template>
  <main>
    <!-- Introduction -->
<section class="relative py-20 mb-8 text-center text-white">
  <div
    class="absolute inset-0 w-full h-full bg-contain introduction-bg"
    style="background-image: url(assets/img/header.png)"
  ></div>
  <div class="container mx-auto">
    <div class="text-white main-header-content">
      <h1 class="mb-5 text-5xl font-bold">{{ $t("home.listen") }}</h1>
      <p class="w-full mx-auto md:w-8/12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </p>
      <p>For more visit:  <a href="https://github.com/Rogalowski">Github Rogalowski</a></p>
        <p> or <a href="https://www.linkedin.com/in/jacek-rogowski/">Linked In Jacek Rogowski</a></p>
    </div>
  </div>

  <img
    class="relative block w-auto max-w-full mx-auto mt-5 -mb-20"
    src="/assets/img/introduction-music.png"
  />
</section>

<!-- Main Content -->
<section class="container mx-auto">
  <div class="relative flex flex-col bg-white border border-gray-200 rounded">
    <div 
    v-icon-secondary="{ icon: 'headphones-alt', right: true }"
    class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Songs</span>
      <!-- Icon v-icon directive headphones  v-icon.right.yellow="'headphones-alt'"--> 
      
      </div>
    <!-- Playlist -->
    <ol id="playlist">
      <AppSongItem v-for="song in songs"
      :key="song.docID"
      :song="song"
      />
    </ol>
    <!-- .. end Playlist -->
  </div>
</section>

</main>
</template>

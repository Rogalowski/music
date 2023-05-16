<script>
// import useUserStore from "@/stores/user"
import AppUpload from '@/components/Upload.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { songsCollection, auth } from '@/includes/firebase'
export default { //beforeRoute Guard
  name: 'manage',
  components: {
    AppUpload, CompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    }
  },
  beforeRouteLeave(to, from, next) { // are you sure to leave manage page?
    if(!this.unsavedFlag){
      next()
    } else{
      const leave = confirm('You have unsaved changes. Are you sure you want to leave page?')
      next(leave)
    }
  },
  //guard for some components to get need auth, better way is use meta
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore()

  //   if(store.userLoggedIn){
  //     next()
  //   }else{
  //     next({name: 'home'})
  //   }
  // }

// beforeRouteLeave(to, from, next){
//   this.$refs.upload.cancelUploads()
//   next()
// }
  async created() { // get songs from database by collections filtered by currentuseruid
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(document => {
      const song = {
        ...document.data(),
        docID: document.id,
      }
      this.songs.push(song)
    });
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  }
}
</script>

<template>


    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
        <app-upload ref="upload"></app-upload>
        </div>
        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i
                class="fa fa-compact-disc float-right text-green-400 text-2xl"
              ></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <composition-item v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
              >
              </composition-item>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Player -->
    <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
      <!-- Track Info -->
      <div class="text-center">
        <span class="song-title font-bold">Song Title</span> by
        <span class="song-artist">Artist</span>
      </div>
      <div class="flex flex-nowrap gap-4 items-center">
        <!-- Play/Pause Button -->
        <button type="button">
          <i class="fa fa-play text-gray-500 text-xl"></i>
        </button>
        <!-- Current Position -->
        <div class="player-currenttime">00:00</div>
        <!-- Scrub Container  -->
        <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
          <!-- Player Ball -->
          <span
            class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
            style="left: 50%"
          >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            style="width: 50%"
          ></span>
        </div>
        <!-- Duration -->
        <div class="player-duration">03:06</div>
      </div>
    </div>

</template>

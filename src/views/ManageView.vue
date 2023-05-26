<script>
// import useUserStore from "@/stores/user"
import AppUpload from '@/components/Upload.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { songsCollection, auth } from '@/includes/firebase'
export default { //beforeRoute Guard
  name: 'ManageView',
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
<main>

    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
        <app-upload ref="upload"></app-upload>
        </div>
        <div class="col-span-2">
          <div
            class="relative flex flex-col bg-white border border-gray-200 rounded"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i
                class="float-right text-2xl text-green-400 fa fa-compact-disc"
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
  </main>
    

</template>

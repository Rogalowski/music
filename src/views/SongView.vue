<script>
import { songsCollection, auth, commentsCollection } from '@/includes/firebase'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import usePlayerStore from '@/stores/player'


export default {
    name: 'SongView',
    data() {
        return {
            song: {},
            comment_in_submission: false,
            comment_show_alert: false,
            comment_alert_variant: 'bg-blue-500',
            comment_alert_message: 'Please wait! Your comment is being submitted',
            comments: [],
            sort: '1',
            schema: {
                comment: 'required|min:3',
            },
        }
    },
    // async created() {
    async beforeRouteEnter(to, from, next) { // will load data quicker
        // const docSnapshot  = await songsCollection.doc(this.$route.params.id ).get()
        const docSnapshot  = await songsCollection.doc(to.params.id ).get()
        
        next((vm) => {
          if (!docSnapshot.exists) {
            vm.$router.push({name: 'home'})
            return
        }
        const { sort } = vm.$route.query
        // will remember sort value after refresh
        vm.sort = sort === '1' || sort === '2' ? sort : '1'
        // this.sort = sort === '1' || sort === '2' ? sort : '1'

        vm.song = docSnapshot.data()
        // this.song = docSnapshot.data()
        vm.getComments()
        // this.getComments()
        })

    },
    computed: {
      ...mapState(useUserStore, ["userLoggedIn"]),
      ...mapState(usePlayerStore, ["playing"]),

      sortedComments() {
        return this.comments.slice().sort((a, b) => {
          if(this.sort === '1') {
            return new Date(b.datePosted) - new Date(a.datePosted)
          }
          return new Date(a.datePosted) - new Date(b.datePosted)
        },)
      }, 
    },
    watch: {
      sort(newVal) {
        if (newVal === this.$route.query.sort) {
          return
        }
        this.$router.push({
          query: {
            sort: newVal,
          },
        })
      }
      
    },
    methods:{
        ...mapActions(usePlayerStore, ['newSong']),
        async addComment(values, {resetForm}) {
            this.comment_in_submission = true
            this.comment_show_alert = true
            this.comment_alert_variant = 'bg-blue-500'
            this.comment_alert_message = 'Please wait! Your comment is being submitted'

            const comment =  {
                content: values.comment,
                datePosted: new Date().toString(),
                sid: this.$route.params.id,
                name: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
            }
            await commentsCollection.add(comment)

            this.song.comment_count += 1
            await songsCollection.doc(this.$route.params.id).update({
              comment_count: this.song.comment_count
            },)

            this.getComments()

            this.comment_in_submission = false
            this.comment_alert_variant = 'bg-green-500'
            this.comment_alert_message = 'Comment has been added!'

            resetForm()
        },
        async getComments() {
            const snapshots = await commentsCollection.where(
                'sid', '==', this.$route.params.id,
                ).get()
            this.comments = []
            snapshots.forEach((doc) => [
                this.comments.push({
                    docID: doc.id,
                    ...doc.data()
                })
            ])
        },
    },
    setup() {

    },
}
</script>

<template>
  <main>
    <!-- Music Header -->
    <section class="relative w-full mb-8 text-center text-white py-14">
      <div
        class="box-border absolute inset-0 w-full h-full bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      >
    >
    </div>
      <div class="container flex items-center mx-auto">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 w-24 h-24 text-3xl text-black bg-white rounded-full focus:outline-none"
          @click.prevent="newSong(song)"
          >
          <i class="fa" :class="playing ? 'fa-pause' : 'fa-play' "> </i>
        </button>
        <div class="z-50 ml-8 text-left">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre ? song.genre : 'No genere' }}</div>
          <div class="song-price"> {{  $n(1, "currency", "pl") }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="relative flex flex-col bg-white border border-gray-200 rounded"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <!-- Comments: {{  song.comment_count }} -->
          <span class="card-title">{{ $tc("song.comment_count", song.comment_count, 
          {count: song.comment_count}) }}</span>
          <i class="float-right text-2xl text-green-400 fa fa-comments"></i>
        </div>
        <div class="p-6">
            <div
                class="p-4 mb-4 font-bold text-center text-white"
                v-if="comment_show_alert"
                :class="comment_alert_variant"
            >
            {{ comment_alert_message }}
        </div>
            <vee-form :validation-schema="schema" @submit="addComment"
                v-if="userLoggedIn"
            >
            <vee-field
                as="textarea"
                name="comment"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
                placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment"/>
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.docID"
        class="p-6 border border-gray-200 bg-gray-50">
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
            {{ comment.content }}
        </p>
      </li>

    </ul>
  </main>
</template>
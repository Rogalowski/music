<script>
import { storage, auth, songsCollection } from '@/includes/firebase'

export default {
    name: 'Upload',
    data() {
        return {
            is_dragover: false,
            uploads: []
        }
    },
    methods: {
      upload($event) {
            this.is_dragover = false
            const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]
            // convert object to array (one is for click and choose file, second for drag and drop)

            files.forEach((file) => {
                if(file.type !== 'audio/mpeg')  return//mime type

              if(!navigator.onLine) { //check if user is offline, offline uploading
                this.uploads.push({
                  task: {}, // for download, not need to use now
                  current_progress: 100,
                  name: file.name,
                  variant: 'bg-red-400',
                  icon: 'fas fa-times',
                  text_class: 'text-red-400'
                })
                return
              }

                const storageRef = storage.ref()  //storage bucket api firebase musicvue-4bd0f.appspot.com
                const songsRef =  storageRef.child(`songs/${file.name}`)  //  musicvue-4bd0f.appspot.com/songs/filename.mp3
                const task = songsRef.put(file)

                const uploadIndex = this.uploads.push({
                    task,
                    current_progress: 0,
                    name: file.name,
                    variant: 'bg-purple-400',
                    icon: 'fas fa-spinner fa-spin',
                    text_class: '',
                    notificaion: ''
                }) -1

                 task.on('state_changed', (snapshot) => { //snapshot contains  info about upload file - upload files firebase
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
                    this.uploads[uploadIndex].current_progress = progress
                    // below I added sucess and fail upload action
                }, (error) => {
                    this.uploads[uploadIndex].variant = 'bg-red-400';
                    this.uploads[uploadIndex].icon = 'fas fa-times';
                    this.uploads[uploadIndex].text_class = 'text-red-400';
                    this.uploads[uploadIndex].notification = `Error: ${error}`;
                    console.log("error: ", error)
                }, async () => {
                    const song = {
                        uid: auth.currentUser.uid,
                        display_name: auth.currentUser.displayName,
                        originl_name: task.snapshot.ref.name,
                        modified_name: task.snapshot.ref.name,
                        genre: '',
                        comment_count: 0,
                    }
                    song.url = await task.snapshot.ref.getDownloadURL()
                    await songsCollection.add(song) //add will generate id, set will able to add custom id

                    this.uploads[uploadIndex].variant = 'bg-green-400';
                    this.uploads[uploadIndex].icon = 'fas fa-check';
                    this.uploads[uploadIndex].text_class = 'text-green-400';
                    this.uploads[uploadIndex].notification = `File has been uploaded successfull`;
                })
            })
      },
      cancelUploads() {
        this.uploads.forEach((upload) => { // will cancel upload file after change page/component view
        upload.task.cancel()
      })
      }

    },
    beforeUnmount() {
      this.uploads.forEach((upload) => { // will cancel upload file after change page/component view
        upload.task.cancel()
      })
    }
}
</script>

<template>
          <div
            class="relative flex flex-col bg-white border border-gray-200 rounded"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">Upload</span>
              <i class="float-right text-2xl text-green-400 fas fa-upload"></i>
            </div>
            <div class="p-6">
              <!-- Upload Dropbox -->
              <div
                class="w-full px-10 py-20 text-center text-gray-400 transition duration-500 border border-gray-400 border-dashed rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"

                :class="{'bg-green-400 border-green-400 border-solid': is_dragover}"
                @drag.prevent.stop=""
                @dragstart.prevent.stop=""
                @dragend.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true"
                @dragenter.prevent.stop="is_dragover = true"
                @dragleave.prevent.stop="is_dragover = false"
                @drop.prevent.stop="upload($event)"
                >
                <h5>Drop your files here</h5>
              </div>
              <input type="file" multiple @change="upload($event)"/>
              <hr class="my-6" />
              <!-- Progess Bars -->
              <div class="mb-4" v-for="upload in uploads" :key="upload.name">
                <!-- File Name -->
                <div class="text-sm font-bold" :class="upload.text_class">
                    <i :class="upload.icon"> </i> {{ upload.name }} <br>
                    {{ upload.notification }}
                </div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                  <!-- Inner Progress Bar -->
                  <div
                    class="transition-all bg-blue-400 progress-bar"
                    :class="upload.variant"
                    :style="{width: upload.current_progress +'%'}"
                  ></div>
                </div>
              </div>
            </div>
          </div>

</template>
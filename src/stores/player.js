import { defineStore } from 'pinia'
import { Howl} from 'howler'
export default defineStore('player', {
    state: () => ({
        current_song: {},
        sound: {},
    }),
    actions: {
        async newSong(song) {
            this.current_song = song
            
            this.sound = new Howl({
                src: [song.url],
                html5: true,  // will allow get songs from external api/database like firebase
            })

            this.sound.play()
        },
        async toggleAudio() {
            if(!this.sound.playing) {
                return
            }
        
            if(this.sound.playing()){
                this.sound.pause()
            } else {
                this.sound.play()
            }
        },
    },
    getters: {
        playing: (state) => {
            if(state.sound.playing){
                return state.sound.playing()
            }
            return false
        }
    }
    
})

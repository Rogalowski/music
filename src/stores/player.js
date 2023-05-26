import { defineStore } from 'pinia'
import { Howl} from 'howler'
import helper from '@/includes/helper'
export default defineStore('player', {
    state: () => ({
        current_song: {},
        sound: {},
        seek: "00:00",
        duration: "00:00",
    }),
    actions: {
        async newSong(song) {
            this.current_song = song
            
            this.sound = new Howl({
                src: [song.url],
                html5: true,  // will allow get songs from external api/database like firebase
            })

            this.sound.play()

            this.sound.on("play", () => {
                requestAnimationFrame(this.progress) //duration song
            })
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
        progress() {
            this.seek = helper.formatTime(this.sound.seek())
            this.duration = helper.formatTime(this.sound.duration())
            
            if(this.sound.playing()) {
                requestAnimationFrame(this.progress)
            }
        }
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

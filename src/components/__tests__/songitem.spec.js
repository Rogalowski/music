import SongItem from "@/components/SongItem.vue"
import {  shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('SongItem.vue', () => {
    test('render song.display_name', () =>{
        
        const song = {
            display_name: 'test',
        }
        const wrapper = shallowMount(SongItem, {
            propsData: {
                song,
            },
            global: {
                components: {
                    'router-link': RouterLinkStub, //RouterLinkStub fake component
                }
            }
        })
        const compositionAuthor = wrapper.find('.text-gray-500')

        expect(compositionAuthor.text()).toBe(song.display_name)
        expect(compositionAuthor.text() === song.display_name).toBe(true) // aviod boolean test, are not reliable
    })


    test('render song.docID in id attribute', () =>{
        
        const song = {
            docID: 'abc',
        }
        const wrapper = shallowMount(SongItem, {
            propsData: {
                song,
            },
            global: {
                components: {
                    'router-link': RouterLinkStub, //RouterLinkStub fake component
                }
            }
        })

        expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`) 
        expect(wrapper.classes()).toContain(`song-id-${song.docID}`) 
    })
})
import {shallowMount, RouterLinkStub} from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'


describe('Snapshots SongItem.vue', () => {
    test('renderes correctly', () => {
        const song = {
            docID: 'abs',
            modified_name: 'text',
            display_name: 'test',
            comment_count: 5, 
        }

        const wrapper = shallowMount(SongItem, {
            propsData: { song },
            global: {
                components: {
                    'router-link': RouterLinkStub,
                }
            }
        })


        expect(wrapper.element).toMatchSnapshot()
        
    })
})
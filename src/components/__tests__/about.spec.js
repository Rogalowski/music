import AboutView from "@/views/AboutView.vue"
import { mount, shallowMount } from '@vue/test-utils'

describe("AboutView.vue", ()=> {
    test('renders inner textt', ()=> {
        const wrapper = mount(AboutView, {
            shallow: true //the same with shallowMount
        })  
        // const wrapper = shallowMount(AboutView) //can limit instances of componentes to one children than mount
          //shallowMount is convinient for isolating components  
        
        expect(wrapper.text()).toContain('about page')
    })
})
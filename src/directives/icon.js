export default {
    beforeMount(el, binding) {
        let iconClass = `float-right text-xl text-green-400 fa fa-${binding.value}`
        
        if(binding.arg === 'full') {
            iconClass = binding.value
        }

        el.innerHTML += `<i class="${iconClass}"></i>`
    }
}
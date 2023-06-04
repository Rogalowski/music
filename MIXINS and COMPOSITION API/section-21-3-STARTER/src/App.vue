<template>
  <div>
    <p>{{ num }} doubled: {{ double }}</p>
    <button @click="incerement">+1 num</button>
    <button ref="btn">Button Ref</button>
    <p>
      <input type="text" v-model="phrase" />
    </p>
    {{ reversePhrase }}
  </div>
</template>

<script>
import { ref, watchEffect, toRefs, reactive, watch, computed, onMounted } from 'vue'
export default {
  name: 'App',
  setup() {
    const btn = ref(null)
    // this.$refs

    onMounted(() => {
      btn.value.addEventListener('click', () => {
        console.log('btn clicked')
      })
    })

    let num = ref(0)
    const phrase = ref('')
    let reversePhrase = ref('')

    function incerement() {
      num.value++
    }

    const double = computed(() => {
      return num.value * 2
    })

    watch([phrase], ([newVal, OldVal]) => {
      reversePhrase.value = phrase.value.split('').reverse().join('')
    })

    return {
      num,
      incerement,
      // ...toRefs(user)
      phrase,
      reversePhrase,
      double,
      btn
    }
  }
}
</script>

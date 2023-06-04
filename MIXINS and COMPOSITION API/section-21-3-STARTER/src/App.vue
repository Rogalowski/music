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
import { useNumbers } from '@/hooks/number'
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

    const phrase = ref('')
    let reversePhrase = ref('')

    watch([phrase], ([newVal, OldVal]) => {
      reversePhrase.value = phrase.value.split('').reverse().join('')
    })

    const { num, incerement, double } = useNumbers()
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

<template>
  <div>
    <p>{{ num }} doubled: {{ double }}</p>
    <button @click="incerement">+1 num</button>
    <p>
      <input type="text" v-model="phrase" />
    </p>
    {{ reversePhrase }}
  </div>
</template>

<script>
import { ref, watchEffect, toRefs, reactive, watch, computed } from 'vue'
export default {
  name: 'App',
  setup() {
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
      phrase,
      reversePhrase,
      double
    }
  }
}
</script>

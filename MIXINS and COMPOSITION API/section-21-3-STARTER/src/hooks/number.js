import { ref, computed } from 'vue'

export const useNumbers = () => {
  let num = ref(0)
  function incerement() {
    num.value++
  }

  const double = computed(() => {
    return num.value * 2
  })

  return { num, incerement, double }
}

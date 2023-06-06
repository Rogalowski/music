<template>
  <div id="app">
    <div class="mt-2 ml-2">
      <button type="button" class="btn btn-primary" @click="openModal">Open</button>
    </div>
    <app-modal :show="open" @hide="open = false" :scrollable="false" />
  </div>
</template>

<script>
import AppModal from '@/components/Modal.vue'
export default {
  name: 'AppAction',
  components: { AppModal },
  data() {
    return {
      open: true
    }
  },
  methods: {
    openModal() {
      this.$emit('open')
    }
  }
}
</script>

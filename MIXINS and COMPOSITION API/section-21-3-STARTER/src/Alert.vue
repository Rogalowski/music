<script>
export default {
  props: ['user'],
  setup(props, context) {
    // context have emit
    // context.emit('eventName', {'payload'}) // the same as this.$emit
  }
}
</script>

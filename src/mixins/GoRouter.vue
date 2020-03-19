<script>
export default {
  methods: {
    goRouter(route) {
      if (route) {
        this.$router.push(route);
      }
    }
  }
};
</script>

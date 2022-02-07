<template>
 <div class="com-container">
    <div class="com-chart" ref="screen_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
computed: {
...mapState(['theme'])
}
}
</script>


<style lang="less" scoped>
</style>
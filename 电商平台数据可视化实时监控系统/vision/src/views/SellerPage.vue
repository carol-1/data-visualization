<!-- 针对于/sellerPage这条路劲而显示出来的，
// 在这个组件中，通过了子组件注册的方法，要显示出Seller.vue这个组件
-->
<template>
    <div class="com-page">
      <seller></seller>
    </div>
</template>

<script>
import Seller from '@/components/Seller'
export default {
    name: 'VisionSellerpage',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
    //注册组件
    components:{
        seller: Seller
    }
};
</script>

<style lang="less" scoped>

</style>
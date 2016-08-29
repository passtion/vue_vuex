<template>
    <Crumb t-name="我的待办"></Crumb>
    <section class="search_bar">
        <div class="search_area">
            <input type="text" placeholder="搜索" maxlength="20">
            <div class="search_icon"></div>
        </div>
    </section>
    <public-table></public-table>
</template>

<script>
    import Crumb from './public/Crumb.vue';
    import PublicTable from './public/PublicTable.vue';
    export default{
        components: {
            Crumb,
            PublicTable
        }
    }
</script>
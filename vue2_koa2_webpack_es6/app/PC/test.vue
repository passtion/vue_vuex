<template>
    <Public-head >
    </Public-head>
    <div class="g-bd">
        <Public-sidebar>
        </Public-sidebar>
        <Pro-recruit-tab>
        </Pro-recruit-tab>
    </div>
</template>
<script>
    import PublicHead from 'public/Head.vue';
    import PublicSidebar from 'public/Head.vue';
    import ProRecruitTab from 'others/ProRecruitTab.vue';
    export default{
        components:{
            PublicHead,
            PublicSidebar,
            ProRecruitTab

        }
    }
</script>

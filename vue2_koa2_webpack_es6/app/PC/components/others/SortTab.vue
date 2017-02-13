<style scoped>
    ul.sortTab {
        width: 100%;
    }

    ul.sortTab li.tab {
        background-color: white;
        margin-bottom: 0.5555555555555556rem;
    }

    ul.sortTab li.tab h3 {
        padding: 0.7407407407407407rem;
        font-size: 0.9629629629629629rem;
        margin-top: 0.2962962962962963rem;

    }
    ul.sortTab li.tab div.item{
        padding: 0 1.2407407407407407rem;;
    }
</style>
<template>
    <div >
        <ul class="sortTab">
            <li v-for="item in list" class="tab">
                <h3>{{item.typename}}</h3>
                <div class="item">
                    <Sort-itm
                            :list="item.children">
                    </Sort-itm>
                </div>

            </li>

        </ul>
    </div>
</template>
<script>
    import SortItm from './SortItmTab.vue'
    export default{
        props: ['list'],
        components: {
            SortItm
        },
        data(){
            return {
                itemList:[]
            }
        },
        ready(){
        }

    }
</script>

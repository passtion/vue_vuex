<template>
    <li >
        <div
                :class="{bold: isFolder}"
                @click="toggle">
            {{model.name}}
            <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul  v-show="open"
        >
            <Tool-recur
                    class="class"
                    v-for="item in model.result"
                    :model="item"
                    :add="add"
                    :filter-key="filterKey">
            </Tool-recur>
        </ul>
    </li>
    <!--<li v-else>-->
        <!--<div-->
                <!--:class="{bold: isFolder}"-->
                <!--@click="toggle">-->
            <!--{{model.name}}-->
            <!--<span v-if="isFolder">[{{open ? '-' : '+'}}]</span>-->
        <!--</div>-->
    <!--</li>-->
</template>
<script>
    import ToolRecur from './ToolRecur.vue';
    export default{
        components: {
            ToolRecur
        },
        props: ['model','class','add','filterKey'],
        data(){
            return {
                open: false
            }
        },
        computed: {
            isFolder() {
//                alert(1);
                return this.model.result;
            }
        },
        methods: {
            toggle() {
                if (this.isFolder) {
                    this.open = !this.open
                }else {
                    this.add(this.model.name);
                }
            }
        }
    }
</script>

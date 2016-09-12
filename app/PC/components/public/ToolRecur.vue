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
                <Tool-recur-two
                        class="item"
                        v-for="item in model.result"
                        :model="item"
                        :add="add"
                        :filter-key="filterKey">
                </Tool-recur-two>
            </ul>
        </li>
</template>
<script>
    import ToolRecurTwo from './ToolRecurTwo.vue';
    export default{
        components: {
            ToolRecurTwo
        },
        props: ['model','class','add','filterKey'],
        data(){
            return {
                open: false
            }
        },
        computed: {
            isFolder() {
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

    class Recur{

    }
</script>

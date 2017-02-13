
<style scoped>
    header {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content:center;
        align-items:center;
        height: 2.4444444444444rem;
        width: 100%;
        background-color: white;
    }

    header input.search {

        height: 1.777777777777778rem;
        line-height: 1.777777777777778rem;
        font-size: 0.9444444444444444rem;
        text-indent: 1.4444444444444444rem;
        outline : none;
        border-radius: 48px;
        background-color:#fcfcfc;

    }
    div.query{
        display: inline-block;
        width: 90%;
    }
    div.search{
        width: 100%;
        position: relative;
        border-radius: 48px;
        border: 1px solid #ececec;
        background-color: white;
        display: inline-block;
        margin: auto;

    }
    div.search:after {
        color: #ef1837;
        position: absolute;
        right: 0.9444444444444444rem;
        line-height: 1.777777777777778rem;
        top:0;
    }

    a.cancle{
        font-size: 0.8888888888889rem;
        line-height: 1.777777777777778rem;
        display: inline-block;
        margin-left: .777777rem;

    }
</style>

<template>
    <header>
        <div class="query" >
            <div v-if="go" class="search iconfont" @click.prevent="goUrl({name:'search'})">
                    <input class="search" type="text" placeholder="商品关键字"  readonly  >
            </div>
            <div v-else class="search iconfont":style="isQuery ?'width: 85%;':''" >
                <form action=""  method="post" @submit.prevent="quary">
                    <input class="search"
                           type="search"
                           v-model="keys"
                           placeholder="商品关键字"
                           autocomplete="off"
                           required
                           @focus="isFocus = true"
                           @blur="isFocus = false"
                           v-el:input>
                </form>
            </div>
            <a v-if="isQuery" class="cancle"  @click.prevent="goBack"> 取消</a>
        </div>
    </header>
</template>

<script>
    import {goToFun} from '../../vuex/index/actions'
    import {updateHistoryKeysFun} from '../../actions/productAcrions'

    export default{
        props: ['isQuery', 'go', 'searchFun'],
        vuex: {
            actions: {
                goToFun,
                updateHistoryKeysFun
            }
        },
        data(){
            return {
                keys: '',
                isFocus: false,
                isFixed: false
            }
        },
        methods: {
            quary(){
                this.updateHistoryKeysFun(this.keys);
                this.searchFun(this.keys)
            },
            goUrl(params){
                this.goToFun({params: params, obj: this})
            },
            goBack(){
                this.isFocus = false;
                history.go(-1)
            },
            setFocus () {
                this.$els.input.focus()
                this.isFocus = true;
            },
            cancel () {
                this.keys = ''
                this.isFocus = false;
            },

        },
        ready(){
                if(!this.go){setTimeout(this.setFocus,1000)}
        }
    }
</script>

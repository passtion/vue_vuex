<template>
    <crumb t-name="我的申请"></crumb>
    <div class="u-bg3 g-padding20">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tc">流程类型：</label>
            <div class="col-sm-2">
                <Selection :options="{ }"></Selection>
            </div>
            <label for="" class="col-sm-2 control-label g-tc">办理状态：</label>
            <div class="col-sm-2">
                <Selection :options="{ }"></Selection>
            </div>
            <label for="" class="col-sm-2 control-label g-tc">文件状态：</label>
            <div class="col-sm-2">
                <Selection :options="{ }"></Selection>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tc">申请日期：</label>
            <div class="col-sm-2">
                <input type="text" class="form-control g-ib g-w45" value="张三">&nbsp;-
                <input type="text" class="form-control g-ib g-w45 g-fr" value="张三" placeholder="">
            </div>
        </div>
        <div class="form-group g-tc g-marginT20">
            <button type="button" class="btn btn-primary g-marginR30">查询</button>
            <button type="button" class="btn btn-default">重置</button>
        </div>
    </div>
    <public-table></public-table>
</template>

<script>
    import Crumb from './public/Crumb.vue';
    import PublicTable from './public/PublicTable.vue';
    import Selection from './public/Selection.vue';
    export default{
        data (){
        return {
        }
    },
        components: {
            Crumb,
            PublicTable,
            Selection
        }

    }
</script>
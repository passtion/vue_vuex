<template>
    <div class="m-list">
        <h3 class="u-icon">{{ subMenus.message }}</h3>
        <ul>
            <li v-for="item in subMenus.list">
                <a v-link="{path: item.route == '/process/new' ? item.route + '/' + item.id : item.route}">{{item.name}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props:{
    'subMenus': {
      type: Object,
      default: function () {
          return { message: '',  list: []}
      }
    }
  }
}
</script>

/**
* @author  sparkHou
* @date 2020-03-03 17:03
* @Description:
*/
<template>
  <div class="typeScriptLearn">

  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import myMixin from '@/utils/mixin'

  @Component
export default class TypeScriptLearn extends Mixins(myMixin) {
  created (): void {
    console.log('typeScriptLearn组件里的created')
  }
}
</script>

<style scoped lang="scss">
  .typeScriptLearn {

  }
</style>

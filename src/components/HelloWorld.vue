<template>
  <div class="hello">
    <h1>使用props-->{{ msg }}</h1>
    <h2>使用vuex-class获取state-->{{test}}</h2>
    <h2>使用coumputedtest-->{{computeInput}}</h2>
    <h2>
      修改vuex的state-->
      <el-input v-model="hwDto.inputVal" @change="changeInput"/>
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import HWDto from './HWDto'

const appSpace = namespace('app')
  @Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string
    @appSpace.State(state => state.test) test: any
    @appSpace.Action('testChange') testChange: any
    hwDto = new HWDto()

    created (): void {
      console.log(this.$store)
    }

    get computeInput () {
      return this.$store.state.app.test
    }

    @Watch('hwDto.inputVal')
    handler (newV: string, oldV: string) {
      console.log('------watch触发', newV, oldV)
    }

    changeInput (val: string): void {
      this.testChange(val)
    }
}
</script>

<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

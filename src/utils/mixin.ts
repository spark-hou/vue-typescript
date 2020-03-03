/**
 * @author  sparkHou
 * @date 2020-03-03 17:30
 * @Description:
 */
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class myMixin extends Vue {
  created (): void {
    console.log('mixin里的create')
  }
}

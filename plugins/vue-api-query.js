import { Model } from 'vue-api-query'
export default function (ctx, injext) {
  Model.$http = ctx.$axios
}
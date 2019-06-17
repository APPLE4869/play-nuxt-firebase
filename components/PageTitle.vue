<template>
  <h1 class="page-title">
    {{text}}
  </h1>
</template>

<script>

export default {
  props: ['text']
}

</script>

<style>
.page-title {
  font-size: 21px;
  margin-bottom: 25px;
  font-weight: bold;
  text-align: center;
}

@media screen and (min-width:480px) {
  .page-title {
    font-size: 35px;
    margin-bottom: 35px;
  }
}
</style>

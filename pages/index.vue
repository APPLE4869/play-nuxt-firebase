<template>
  <section class="container">
    <h1 class="title">
      SampleProject
    </h1>
    <h2 class="subtitle">
      This is a Sample Project.
    </h2>
  </section>
</template>

<style scoped>
.container {
  text-align: center;
  padding-top: 25vh;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 32px;
  letter-spacing: 1px;
  font-weight: bold;
}

.subtitle {
  font-size: 12px;
}

@media screen and (min-width:480px) { 
  .title {
    font-size: 100px;
  }

  .subtitle {
    font-size: 32px;
  }
}
</style>

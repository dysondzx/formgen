<template>
  <div class="remark-upload-container">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .remark-upload-container {
    padding: 5px 10px;
    background: #f390a3;
    min-height: 36px;
    .file-list-container {
      a {
        color: #4848c3;
      }
    }
  }
</style>

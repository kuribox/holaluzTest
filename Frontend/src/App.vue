<template>
  <header id="header">
    <img alt="Logo" src="@/assets/logo.svg" width="100">
    <h1>{{ $t('TITLE') }}</h1>
  </header>
  <ClientForm />
</template>

<script>
import ClientForm from './components/ClientForm.vue';

export default {
  name: 'App',
  components: {
    ClientForm
  }
};
</script>

<style>
  #header {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 2;
  }

  #header img {
    margin-right: 10px;
  }

  #header h1 {
    margin: 0;
    font-size: 24px;
  }
</style>
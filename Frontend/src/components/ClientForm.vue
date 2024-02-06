<template>
  <div id="clientForm">
    <label for="cupsInput">{{ $t('SEARCH_INPUT') }}</label>
    <input v-model="cups" id="cupsInput" @keyup.enter="fetchData" />
    <button @click="fetchData">{{ $t('SEARCH_BUTTON') }}</button>

    <p v-if="result === null">{{ $t('noElements') }}</p>
    <div v-if="result" class="content">
      <ul>
        <li v-if="result.offers.isRooftopRevolutionAllowed" class="item">
          <span class="key">{{ $t('isRooftopRevolutionAllowed') }}:</span> <span class="value">{{ $t('YES') }}</span>
        </li>
        <li v-else class="item">
          <span class="key">{{ $t('isRooftopRevolutionAllowed') }}:</span> <span class="value">{{ $t('NO') }}</span>
        </li>

        <li v-if="result.offers.discount === 0" class="item">
          <span class="key">{{ $t('discount') }}:</span> <span class="value">{{ $t('NO') }}</span>
        </li>
        <li v-else class="item">
          <span class="key">{{ $t('discount') }}:</span> <span class="value">{{ result.offers.discount }}%</span>
        </li>

        <li v-for="(value, key) in result.clientInfo" :key="key" class="item">
          <span class="key">{{ $t(key) }}:</span> <span class="value">{{ value }}</span>
        </li>
        
        <template v-for="(value, key) in result.supplyPointInfo" :key="key">
          <template v-if="Array.isArray(value)">
            <li class="item">
              <span class="key">{{ $t(key) }}:</span> <span class="value">{{ value.join(', ') }}</span>
            </li>
          </template>
          <template v-else-if="typeof value === 'object'">
            <template v-for="(subValue, subKey) in value" :key="subKey">
              <li class="item">
                <span class="key">{{ $t(key) }} - {{ subKey }}:</span> <span class="value">{{ subValue }}</span>
              </li>
            </template>
          </template>
          <template v-else>
            <li class="item">
              <span class="key">{{ $t(key) }}:</span> <span class="value">{{ value }}</span>
            </li>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        cups: '',
        result: undefined,
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.post('http://localhost:3000/clients/info', { cups: this.cups });
          this.result = response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          this.result = null;
        }
      },
      formatValue(value) {
        if (Array.isArray(value)) {
          return value.join(', ');
        } else if (typeof value === 'object') {
          return Object.entries(value).map(([subKey, subValue]) => `${subKey}: ${subValue}`).join(', ');
        }
        return value;
      }
    },
  };
</script>

<style>
  #clientForm {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  label {
    margin-right: 10px;
  }

  input {
    margin-bottom: 10px;
  }

  button {
    cursor: pointer;
  }

  h2 {
    margin-top: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .content {
    display: flex;
    justify-content: center;
  }

  .item {
    margin-bottom: 5px;
    display: flex;
    justify-content: center;;
    padding: 5px;
  }

  .key {
    text-align: right;
    margin-right: 10px;
    font-weight: bold;
    text-transform: capitalize;
  }

  .value {
    text-align: left;
    flex: 1;
  }

  .item:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
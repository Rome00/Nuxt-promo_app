<template>
  <div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-fifths">
          <div class="tabs is-mt-2 is-centered">
            <ul>
              <li :class="{ 'is-active': tabs.en }" @click="cvSwitch('en')">
                <a>English</a>
              </li>
              <li :class="{ 'is-active': tabs.ka }" @click="cvSwitch('ka')">
                <a>Georgian</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <iframe
        v-if="tabs.en"
        src="/Romeo_Khazalia_EN.pdf"
        :style="{ width: '100%', height: '800px' }"
      ></iframe>

      <iframe
        v-else
        src="/Romeo_Khazalia_KA.pdf"
        :style="{ width: '100%', height: '800px' }"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: {
        en: true,
        ka: false
      }
    }
  },
  methods: {
    cvSwitch(lang) {
      if (lang === 'ka') {
        this.tabs.en = false
        this.tabs.ka = true
      } else {
        this.tabs.en = true
        this.tabs.ka = false
      }
    }
  },
  head: {
    title: 'CV | Romeo Khazalia'
  }
}
</script>

<style lang="scss" scoped></style>

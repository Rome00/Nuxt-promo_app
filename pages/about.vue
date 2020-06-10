<template>
  <div class="about-page">
    <div class="container">
      <figure class="avatar">
        <img src="/me.jpg" />
      </figure>
      <p>
        My name is Romeo Khazalia and I am an Front-End and freelance developer.
      </p>
      <div class="is-mt-1">
        <p class="has-text-justified">
          I graduated from Tbilisi and Ilia State University, Faculty of Exact
          and Natural Sciences. With a master’s degree in geoinformation system.
          Later I became interested in web development and extended my studies
          at the Academy of Information Technology as a frontend developer.
          <br />
          I am currently inspired in Vue.js Library and I'm continually striving
          to advance my knowledge in this regard, I desire to work on projects
          where I will have the possibility to use it and to expand my working
          experience even more.
        </p>
        <br />
        <div class="is-mt-1">
          <h3 class="is-size-2">
            Front-end tools I use:
          </h3>
          <div
            class="breadcrumb has-bullet-separator is-medium"
            aria-label="breadcrumbs"
          >
            <ul>
              <li>
                <div class="has-deep-orange-text text-darken-2">HTML5</div>
              </li>
              <li><div class="has-light-blue-text text-darken-1">Css3</div></li>
              <li>
                <div class="has-amber-text text-lighten-1">JavaScript</div>
              </li>
              <li><div class="has-green-text text-accent-5">Vue.js</div></li>
              <li><div class="has-green-text text-accent-5">Nuxt.js</div></li>
              <li><div class="has-pink-text text-accent-2">Scss</div></li>
              <li><div class="has-teal-text text-accent-3">Bulma</div></li>
              <li>
                <div class="has-deep-purple-text text-lighten-1">Bootstrap</div>
              </li>
              <li>
                <div class="has-deep-purple-text text-lighten-1">Buefy</div>
              </li>
              <li><div class="has-blue-text text-darken-3">Vuetify</div></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Learn more about Romeo Khazalia | Romeo Khazalia'
  }
}
</script>

<style lang="scss" scoped>
.about-page {
  padding-top: 80px;
  position: relative;
  max-width: 800px;
  margin: 0 auto 5rem auto;
  font-size: 25px;
}
.avatar {
  margin-right: 20px;
  float: left;
}
.avatar img {
  height: 128px;
  width: 128px;
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.breadcrumb li:first-child div {
  padding-left: 0;
}
.breadcrumb div {
  align-items: center;
  color: #4bacff;
  display: flex;
  justify-content: center;
  padding: 0 0.75em;
  font-weight: 500;
}
</style>

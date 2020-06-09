<template>
  <div class="about-page">
    <div class="container">
      <figure class="avatar">
        <img src="/me.jpg" />
      </figure>
      <p>
        My name is Romeo Khazalia and I am an Front-End and freelance developer.
      </p>
      <br />
      <div>
        I am a Front End developer with experience building websites and web
        applications. I specialize in Front-end tools:
        <ul>
          <li>JavaScript, Vue.js.</li>
          <li>HTML5, Css3, Sass</li>
          <li>Bootstrap, Bulma</li>
          <li>Vuetyfy, Buefy.</li>
        </ul>
      </div>
      <br />
      <p>
        Throughout my career, I have acquired technical knowledge and the
        ability to explain programming topics clearly and in detail to a broad
        audience.
      </p>
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
ul {
  margin-left: 60px;
  display: list-item;
  list-style: circle;
}
</style>

<template>
  <nav class="navbar is-active" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" :to="{ name: 'index' }">
        <h1 class="brand-title">Promo-Yourself</h1>
      </nuxt-link>
      <!-- Adds click to open -->
      <!-- Adds active class -->
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        :class="{ 'is-active': isActive }"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- Adds active class -->
    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <nav-bar :route="{ name: 'index' }" class="navbar-item">Home</nav-bar>
        <nav-bar :route="{ name: 'courses' }" class="navbar-item">
          Courses
        </nav-bar>
        <nav-bar :route="{ name: 'blogs' }" class="navbar-item">Blogs</nav-bar>
        <nav-bar :route="{ name: 'about' }" class="navbar-item">About</nav-bar>
        <nav-bar :route="{ name: 'cv' }" class="navbar-item">Cv</nav-bar>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <!-- If Authenticated -->
            <template v-if="isAuth">
              <figure class="image avatar is-32x32 is-mr-0-half is-mb-0-half">
                <img class="is-rounded" :src="user.avatar" />
              </figure>
              <div class="is-mr-0-half is-mb-0-half">
                Welcome {{ user.username }}!
              </div>
              <!-- If Admin -->
              <button
                v-if="isAdmin"
                class="button is-link is-outlined"
                @click="() => $router.push({ name: 'instructor' })"
              >
                Instructor
              </button>
              <a class="button is-primary" @click="logOut">Logout</a>
            </template>
            <template v-else>
              <nuxt-link :to="{ name: 'register' }" class="button is-primary">
                Sign up
              </nuxt-link>
              <nuxt-link :to="{ name: 'login' }" class="button is-light">
                Log in
              </nuxt-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '@/components/shared/NavLink'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/authUser',
      isAuth: 'auth/isAuthenticated',
      isAdmin: 'auth/isAdmin'
    })
  },
  methods: {
    logOut() {
      this.$store
        .dispatch('auth/logOutUser')
        .then(() => this.$router.push({ name: 'login' }))
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-title {
  font-size: 35px;
  font-weight: bold;
}
.navbar-brand {
  padding-right: 30px;
}
.avatar {
  margin-right: 5px;
}
.navbar-item {
  outline: none;
}
button {
  outline: 0;
  &:focus {
    outline: 0;
  }
  &:active {
    outline: 0;
  }
}
</style>

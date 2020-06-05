<template>
  <div class="heroes-page">
    <div class="container">
      <h1 class="title">Course Heroes</h1>
      <portal-target
        v-for="hero in heroes"
        :key="hero._id"
        :name="`modal-view-${hero._id}`"
      />
      <table class="heroes-table table is-responsive is-100">
        <thead>
          <tr class="main-table-row">
            <th></th>
            <th>Image</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(hero, index) in heroes"
            :key="hero._id"
            class="table-row"
            :class="{ isActive: activeHero._id === hero._id }"
            @click="openModal(hero._id)"
          >
            <th>{{ index + 1 }}</th>
            <td>
              <img v-if="hero.image" :src="hero.image" />
              <span v-else>Not set</span>
            </td>
            <td>{{ hero.title || 'Not set' }}</td>
            <td>{{ hero.subtitle || 'Not set' }}</td>
            <td
              :class="[
                activeHero._id === hero._id
                  ? 'has-green-text text-darken-4'
                  : 'has-deep-orange-text text-darken-3'
              ]"
            >
              {{ activeHero._id === hero._id ? 'Active' : 'Inactive' }}
            </td>
            <td v-show="false" class="modal-td">
              <portal :to="`modal-view-${hero._id}`">
                <Modal
                  :ref="`modal-${hero._id}`"
                  :show-button="false"
                  action-title="Make Active"
                  open-title="Favorite"
                  title="Make Course Hero"
                  @submitted="activateHero($event, hero._id)"
                >
                  <div>
                    <div class="subtitle">
                      Title: {{ hero.title || 'Not set' }}
                    </div>
                    <div class="subtitle">
                      Subtitle: {{ hero.subtitle || 'Not set' }}
                    </div>
                    <figure class="image is-3by1">
                      <img :src="hero.image" />
                    </figure>
                  </div>
                </Modal>
              </portal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Modal from '~/components/shared/Modal'

export default {
  middleware: 'admin',
  components: {
    Modal
  },
  async fetch({ store }) {
    await store.dispatch('instructor/fetchHeroes')
  },
  computed: {
    heroes() {
      return this.$store.state.instructor.heroes
    },
    activeHero() {
      return this.$store.state.courseHero.item
    }
  },
  methods: {
    openModal(modalId) {
      const modal = this.$refs[`modal-${modalId}`][0]
      modal.openModal()
    },
    activateHero({ closeModal }, heroID) {
      this.$store.dispatch('instructor/activateHero', heroID).then(_ => {
        this.$toasted.success('Hero was successfully activated', {
          duration: 2000,
          position: 'bottom-right'
        })
      })
      closeModal()
    }
  }
}
</script>
<style scoped lang="scss">
.heroes-page {
  max-width: 1000px;
  margin: 0 auto 5rem auto;
  margin-top: 40px;
}
.title {
  font-size: 45px;
  font-weight: bold;
}
.table-row {
  margin: 20px;
  &.isActive {
    background-color: #dfffe1;
  }
  &:hover {
    cursor: pointer;
    background-color: #e4e4e4;
  }
}
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      ref="header"
      elevated
    >
      <q-toolbar>
        <q-toolbar-title
          v-if="mock.clinic"
        >
          РОЗКЛАД ПРИЙОМУ ЛІКАРІВ-ФАХІВЦІВ {{ mock.clinic.name }}
        </q-toolbar-title>
        <q-toggle
          v-model="isDark"
          label="Go Dark"
        />
      </q-toolbar>
    </q-header>
    <q-page-container :class="{'dark-theme': isDark}">
      <q-page
        class="flex"
        v-if="mock.employees && mock.employees.length"
      >
        <virtual-list
          ref="scroll"
          style="height: calc(100vh - 50px); overflow-y: auto;"
          item-class="list-item"
          :keeps="5"
          :data-key="'name'"
          :data-sources="mock.employees"
          :data-component="DoctorSchedule"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import dataService from '../services/data.service'
import VirtualList from 'vue-virtual-scroll-list'
import DoctorSchedule from '../components/DoсtorSchedule'

const UPDATE_INTERVAL = 5 * 60 * 1000;
const SCROLL_INTERVAL = 2 * 1000;

export default {
  name: 'Timetable',
  data () {
    return {
      mock: [],
      interval: null,
      DoctorSchedule,
      isDark: false,
      currentItem: 0
    }
  },
  components: {
    VirtualList,
  },
  mounted () {
    this.getTimetable()
    this.interval = setInterval(
      () => this.getTimetable(), UPDATE_INTERVAL
    )
    this.$nextTick(() => {
      setInterval(() => {
        const scrollContainer = this.$refs.scroll
        if (this.currentItem < this.mock.employees.length) {
          scrollContainer.scrollToIndex(this.currentItem++)
        } else {
          scrollContainer.scrollToIndex(0)
          this.currentItem = 0
        }
      }, SCROLL_INTERVAL)
    })
  },
  methods: {
    getTimetable () {
      return dataService.getTimetable().then(resp => {
        for (let i = 0; i < resp.data.employees.length; i++) {
          resp.data.employees[i].id = i;
        }
        this.mock = resp.data
      })
    }
  }
}
</script>

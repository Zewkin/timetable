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
          style="height: calc(100vh - 50px); overflow-y: auto;"
          item-class="list-item"
          :keeps="5"
          :estimate-size="200"
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

export default {
  name: 'Timetable',
  data () {
    return {
      mock: [],
      interval: null,
      DoctorSchedule,
      isDark: false
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
  },
  methods: {
    getTimetable () {
      return dataService.getTimetable().then(resp => {
        this.mock = resp.data
      })
    }
  }
}
</script>

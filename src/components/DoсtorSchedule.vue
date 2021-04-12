<template>
  <div class="doctor flex row">
    <div class="doctor-info">
      <img
        :src="source.avatar_uri" 
        :alt="source.name"
        class="doctor-info-photo"
      />
      <span class="doctor-info-title">{{ source.title }}</span>
      <span class="doctor-info-name">{{ source.name }}</span>
      <div class="doctor-info-location">
        <q-chip square>
          {{ source.location }}
        </q-chip>
      </div>
    </div>
    <div class="doctor-schedule">
      <div class="doctor-schedule-weekly flex row">
        <div
          class="doctor-schedule-weekly-day"
          v-for="(day, i) in source.weekly_schedule"
          :key="i"
        >
          <span class="doctor-schedule-weekly-day-name">{{ getDayName(i) }}</span>
          <span class="doctor-schedule-weekly-day-hours">{{ day.start_at }} - {{ day.end_at }}</span>
        </div>
      </div>
      <div class="doctor-schedule-separator">
        На сьогодні
      </div>
      <div class="doctor-schedule-slots flex row">
        <div
          class="doctor-schedule-slots-slot q-mr-sm"
          :class="{ 'doctor-schedule-slots-slot-disabled': !slot[Object.keys(slot)[0]] }"
          v-for="(slot, i) in source.open_slots_for_today"
          :key="i"
        >
          <q-badge color="blue">
            {{ Object.keys(slot)[0] }}
          </q-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDayName } from '../utils'
export default {
  name: 'DoctorSchedule',
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object
    }
  },
  methods: {
    getDayName
  }
}
</script>

<style lang="scss">
  .doctor {
    width: 100%;
    padding: 20px;
    &-info {
      width: 300px;
      &-photo {
        width: 100px;
        float: left;
        margin-right: 15px;
      }
      &-title {
        display: block;
      }
      &-name {
        display: block;
      }
    }
    &-schedule {
      flex: 1;
      &-weekly {
        justify-content: space-between;
        &-day {
          text-align: center;
          &-name {
            display: block;
          }
          &-hours {
            display: block;
          }
        }
      }
      &-separator {
        margin: 15px 0;
      }
      &-slots {
        flex-wrap: wrap;
        &-slot {
          cursor: pointer;
          &-disabled {
            cursor: auto;
            opacity: .5;
          }
        }
      }
    }
  }
</style>
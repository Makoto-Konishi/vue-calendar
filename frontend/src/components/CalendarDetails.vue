<template>
<div>
  <h1>
    Calendar
  </h1>
  <p>events</p>
  <div v-for="event in events" :key="event.id">
      <h2>{{event.name}}</h2>
      <p>start: {{event.start}}</p>
      <p>end: {{event.end}}</p>
      <p>description: {{event.description}}</p>
  </div>
  <button type="submit" @click="fetchEvents()">fetch events</button>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
  export default{
    name: 'CalendarDetails',
    computed: {
      ...mapGetters('events', ['events'])
    },
    methods: {
      ...mapActions('events', ['fetchEvents'])
    }
  };
</script>

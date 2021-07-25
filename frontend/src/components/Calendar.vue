<template>
<div>
  <div>
  <h1>
    Calendar
  </h1>
  <p>events</p>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{event.name}}
      </li>
    </ul>
    <button type="submit" @click="fetchEvents()">fetch events</button>
  </div>
  <div>
    <CalendarDetails />
  </div>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import CalendarDetails from './CalendarDetails.vue'
  export default{
    name: 'Calendar',
    computed: {
      ...mapGetters('events', ['events']),
    },
    components:{
      CalendarDetails
    },
    methods: {
      ...mapActions('events', ['fetchEvents']),
    }
  };
</script>

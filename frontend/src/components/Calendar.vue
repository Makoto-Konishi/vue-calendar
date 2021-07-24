<template>
<div>
  <h1>
    Calendar
  </h1>
  <p>events</p>
  <div>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{event}}
      </li>
    </ul>
    <button type="submit" @click="fetchEvents()">fetch events</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';
  export default{
    name: 'Calendar',
    data: ()=> ({
      events: []
    }),
    methods: {
      fetchEvents() {
        axios
        .get("http://localhost:3000/events")
        .then(response => {
          this.events = response.data;
        })
        .catch(error => {
          console.error(error);
        })
      }
    }
  };
</script>

<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday()">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh">
      <!-- :events ="events" :eventsはnamespaceで、"events"はgetterから取得したもので:eventsに代入している-->
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        @change="fetchEvents"
        @click:event="showEvent"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="(timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'"
      ></v-calendar>
    </v-sheet>
    <!-- 1.初期状態ではダイアログが表示されず、予定をクリックした時にeventに値が代入されてダイアログが表示 -->
    <v-dialog :value="event !== null" @click:outside="closeDialog()" width="600">
      <EventDetailDialog v-if="event !== null" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { format } from 'date-fns';
import EventDetailDialog from './EventDetailDialog.vue';

export default {
  name: 'Calendar',
  data: () => ({
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  components: {
    EventDetailDialog,
  },
  computed: {
    ...mapGetters('events', ['events', 'event']),
    title() {
      return format(new Date(this.value), 'yyyy年 M月');
    },
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'setEventActions']),
    setToday() {
      this.value = format(new Date(), 'yyyy/MM/dd');
    },
    showEvent({ event }) {
      // 2.showEventが呼び出されたら、dialogにイベント名を代入
      this.setEventActions(event);
    },
    closeDialog() {
      this.setEventActions(null);
    },
  },
};
</script>

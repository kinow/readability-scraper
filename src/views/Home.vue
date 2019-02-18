<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Readability Scraper</h2>
            <form>
              <div class="form-group">
                <label for="url">URL</label>
                <input v-model="url" type="url" class="form-control form-control-lg" id="url" aria-describedby="urlHelp" placeholder="Enter URL" autofocus>
                <small id="urlHelp" class="form-text text-muted">We'll use mozilla/readability to parse and extract title and author.</small>
              </div>
              <button type="submit" class="btn btn-primary" @click="onSubmit" :disabled="isLoading">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading" required></span>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="hasAlerts">
      <div class="col-sm">
        <div v-for="alert in alerts" :class="cssClass(alert)" role="alert">
          <h4 class="alert-heading" v-if="alert.title">{{ alert.title }}</h4>
          {{ alert.detail }}
        </div>
      </div>
    </div>
    <div class="row" v-if="html">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label for="html">HTML</label>
              <textarea class="form-control" id="html" rows="4">{{ html }}</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="git">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label for="html">Git commit message</label>
              <input class="form-control" id="git" :value="git" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Alert, AlertType } from '@/utils';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState(['isLoading', 'alerts']),
  },
})
export default class Home extends Vue {

  constructor() {
    super();
  }

  get url(): string {
    return this.$store.getters.url;
  }

  set url(url) {
    this.$store.commit('setUrl', url);
  }

  public onSubmit() {
    this.$store.dispatch('read');
  }

  get html(): string {
    return this.$store.getters.html;
  }

  get git(): string {
    return this.$store.getters.git;
  }

  public hasAlerts(): boolean {
    return this.$store.getters.alerts;
  }

  public cssClass(alert: Alert): string {
    return 'alert alert-' + alert.type.valueOf();
  }
}
</script>

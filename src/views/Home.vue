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
                <input type="url" class="form-control form-control-lg" id="url" aria-describedby="urlHelp" placeholder="Enter URL">
                <small id="urlHelp" class="form-text text-muted">We'll use mozilla/readability to parse and extract title and author.</small>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label for="html">HTML</label>
              <textarea class="form-control" id="html" rows="3">ABCD!</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label for="html">Git commit message</label>
              <textarea class="form-control" id="git" rows="3">ABCD!</textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<template>
  <div>
    <app-header></app-header>
    <div class="max-w-screen-md m-auto p-6 mt-12 space-y-2">
      <h1 class="text-3xl font-bold">Privacy Policy</h1>
      <h2 class="text-2xl font-semibold">
        Slim launcher does, and will never, have access to the internet.
      </h2>
      <h3 class="text-xl">Definitions</h3>
      <p>We - The dev, contributors and/or the app itself as an entity</p>
      <ul class="space-y-4">
        <li>
          Slim was made with your privacy in mind, so we do not collect
          personally identifiable information about you. In other words, we do
          not collect information such as your name, address, phone number,
          email address or precise geographic location.
        </li>
        <li>
          We may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. We will
          notify you of any changes by posting the new Privacy Policy on this
          page. These changes are effective immediately after they are posted on
          this page.
        </li>
        <li>
          Slim launcher is
          <a href="https://github.com/sduduzog/slim-launcher">open source. </a
          >Feel free to review the code and ticker around the codebase to know
          how everything works
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/app-header.vue'
export default {
  components: {
    AppHeader
  }
}
</script>

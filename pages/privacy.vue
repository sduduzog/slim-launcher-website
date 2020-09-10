<template>
  <div>
    <app-header></app-header>
    <div class="max-w-screen-md m-auto p-6 mt-12">
      <h1 class="text-3xl font-bold">Privacy Policy</h1>
      <h2 class="text-2xl font-semibold">
        Slim launcher does, and will never, have access to the internet.
      </h2>
      <ul class="space-y-4">
        <li>
          All the data i.e. in-app preferences etc, captured by slim launcher
          will never leave your device, as such, we do not retrieve or collect
          any information about you.
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

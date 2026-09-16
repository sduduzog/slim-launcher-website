<template>
  <div>
    <app-header></app-header>
    <div class="max-w-screen-md m-auto p-6 mt-12 space-y-2">
      <h1 class="text-3xl font-bold">Privacy Policy</h1>
      <h2 class="text-2xl font-semibold">
        Slim Launcher has no internet access.
      </h2>
      <ul class="space-y-4">
        <li>
          Slim Launcher does not transmit user or device data off the device.
          The app has no user accounts, analytics, advertising, telemetry, or
          data-sharing functionality.
        </li>
        <li>
          Preferences and selected-app information are stored only on your
          device and are used only to provide the launcher's features.
        </li>
        <li>
          Uninstalling the app removes its locally stored app data, subject to
          normal Android behavior.
        </li>
        <li>
          Slim Launcher is
          <a href="https://github.com/sduduzog/slim-launcher">open source</a>.
          You can review the code to see how it works.
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

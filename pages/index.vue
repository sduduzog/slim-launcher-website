<template>
  <div class="box-border">
    <header class="flex">
      <img src="img/slim-logo.jpg" class="block w-16 h-16" alt="Slim logo" />
      <h2 class="m-0 p-2 text-3xl font-light">
        Slim launcher
      </h2>
      <nav class="flex-grow flex justify-end p-3">
        <a href="https://github.com/sduduzog/slim-launcher" class="block p-2">
          <ic-github></ic-github>
        </a>
      </nav>
    </header>
    <main role="main">
      <section role="banner">
        <div class="grid col-gap-10 pt-12 gap-10">
          <h1 class="text-center text-2xl p-4">
            A minimalist launcher that only allows you to use fewer apps on your
            phone
          </h1>
          <img
            src="img/screenshot.png"
            class="screenshot"
            alt="Home screen screenshot"
          />
          <a
            class=""
            href="https://play.google.com/store/apps/details?id=com.sduduzog.slimlauncher"
          >
            <img
              class="block m-auto w-64"
              src="img/google-play-badge.png"
              alt="Google Play badge"
            />
          </a>
          <a
            class=""
            href="https://f-droid.org/en/packages/com.sduduzog.slimlauncher"
          >
            <img
              class="block m-auto w-64"
              src="img/badge_get-it-on-en-us.png"
              alt="F-droid badge"
            />
          </a>
        </div>
      </section>
    </main>
    <footer class="text-center p-4">
      <p>Made with ❤ by <a href="https://sduduzog.com">Sdu</a></p>
    </footer>
  </div>
</template>

<script>
import IcGithub from '@/components/ic-github.vue'
export default {
  components: {
    IcGithub
  }
}
</script>

<style>
.screenshot {
  justify-self: center;
  @apply row-start-1;
  @apply shadow-2xl;
  @apply w-64;
}
</style>

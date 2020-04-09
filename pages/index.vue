<template>
  <div class="box-border">
    <header class="flex max-w-screen-xl m-auto">
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
    <main role="main" class="lg:p-12">
      <section
        role="banner"
        class="m-auto md:max-w-screen-md lg:max-w-screen-lg text-2xl lg:text-3xl"
      >
        <div class="grid m-auto col-gap-10 pt-12 gap-10 md:grid-cols-2">
          <h1
            class="text-center p-4 md:px-10 md:col-span-2 lg:row-start-1 lg:pt-16 lg:pb-0"
          >
            A minimalist launcher that only allows you to use fewer apps on your
            phone
          </h1>
          <img
            src="img/screenshot.png"
            class="screenshot col-span-2 lg:row-start-2 lg:row-span-2"
            alt="Home screen screenshot"
          />
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.sduduzog.slimlauncher"
            >
              <img
                class="block m-auto w-56 md:mr-0"
                src="img/google-play-badge.png"
                alt="Google Play badge"
              />
            </a>
          </div>
          <div>
            <a href="https://f-droid.org/en/packages/com.sduduzog.slimlauncher">
              <img
                class="block m-auto w-56 md:ml-0"
                src="img/badge_get-it-on-en-us.png"
                alt="F-droid badge"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
    <footer class="text-center p-4 hidden">
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

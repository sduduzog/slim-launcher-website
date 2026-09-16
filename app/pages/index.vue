<template>
  <div class="grid grid-rows-layout min-h-screen box-border">
    <AppHeader />
    <main class="grow lg:p-12">
      <section
        class="m-auto md:max-w-[48rem] lg:max-w-[64rem] text-2xl lg:text-3xl"
      >
        <div
          class="grid m-auto pt-12 gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_16rem]"
        >
          <h1
            class="text-center p-4 md:px-10 col-span-2 lg:row-start-1 lg:pt-16 lg:pb-0"
          >
            A minimalist launcher that only allows you to use fewer apps on your
            phone
          </h1>
          <img
            src="/img/screenshot-min.png"
            class="screenshot col-span-2 row-start-1 justify-self-center shadow-2xl w-64 lg:col-span-1 lg:col-start-3 lg:row-span-2"
            alt="Home screen screenshot"
          />
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.sduduzog.slimlauncher"
            >
              <img
                class="block m-auto w-56 md:mr-0"
                src="/img/google-play-badge.png"
                alt="Google Play badge"
              />
            </a>
          </div>
          <div>
            <a href="https://f-droid.org/en/packages/com.sduduzog.slimlauncher">
              <img
                class="block m-auto w-56 md:ml-0"
                src="/img/badge_get-it-on-en-us.png"
                alt="F-droid badge"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
    <footer class="text-center p-4">
      <p>
        Made with ❤ by <a href="https://iamsdu.online">Sdu</a> and the
        <a href="https://github.com/sduduzog/slim-launcher/graphs/contributors"
          >community</a
        >
      </p>
      <p>
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      </p>
    </footer>
  </div>
</template>

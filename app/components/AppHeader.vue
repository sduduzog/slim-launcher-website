<template>
  <header class="flex w-full max-w-[80rem] m-auto">
    <NuxtLink to="/" aria-label="Slim Launcher home">
      <img src="/img/slim-logo.jpg" class="block w-16 h-16" alt="Slim logo" />
    </NuxtLink>
    <h2 class="m-0 p-2 text-3xl font-light">Slim launcher</h2>
    <nav class="flex grow justify-end p-3" aria-label="Project">
      <a
        href="https://github.com/sduduzog/slim-launcher"
        class="block p-2"
        aria-label="Slim Launcher on GitHub"
      >
        <IcGithub />
      </a>
    </nav>
  </header>
</template>

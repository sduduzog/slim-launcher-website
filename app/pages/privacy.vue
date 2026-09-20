<script setup lang="ts">
useHead({
  title: 'Privacy Policy | Slim Launcher',
  meta: [
    {
      name: 'description',
      content:
        'How Slim Launcher handles local launcher data, voluntary support communications, and deletion requests.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://slimlauncher.com/privacy' }],
})
</script>

<template>
  <div>
    <AppHeader />
    <main class="max-w-[48rem] mx-auto p-6 mt-12 flex flex-col gap-2">
      <h1 class="text-3xl font-bold">Privacy Policy</h1>
      <p>Last updated: <time datetime="2026-09-20">20 September 2026</time></p>
      <p>
        This policy covers the Slim Launcher Android app, maintained by Sdu
        (sduduzog).
      </p>
      <p>
        Slim Launcher has no internet permission, accounts, analytics,
        advertising, or telemetry. It does not automatically transmit launcher
        data or other information from the app to the developer.
      </p>

      <section class="mt-4 flex flex-col gap-2">
        <h2 class="text-2xl font-semibold">Data used on your device</h2>
        <p>
          Slim Launcher reads the apps available in your personal and work
          profiles so you can find, select, and launch them. This information is
          processed on your device.
        </p>
        <p>
          It stores your selected apps, their names and launch identifiers,
          profile identifiers, custom labels, and display order in a local
          database. Theme, clock, and status-bar preferences are also stored
          locally. These records are used only for launcher features and are
          protected by Android's app-private storage.
        </p>
      </section>

      <section class="mt-4 flex flex-col gap-2">
        <h2 class="text-2xl font-semibold">Other apps and services</h2>
        <p>
          Slim Launcher bundles its fonts with the app and does not download
          fonts or other resources at runtime. Shortcuts may open other apps,
          such as the dialer, camera, calendar, and clock. Those apps handle
          their own data independently, and Slim Launcher does not read their
          contents.
        </p>
      </section>

      <section class="mt-4 flex flex-col gap-2">
        <h2 class="text-2xl font-semibold">Support communications</h2>
        <p>
          Slim Launcher does not automatically collect or transmit your email
          address. If you voluntarily contact the developer by email, including
          through the developer contact information on Google Play, the
          developer receives your email address and message.
        </p>
        <p>
          This information is used only to respond to your support or privacy
          request. It is not sold, used for advertising or analytics, or shared
          with third parties except the email services needed to deliver the
          correspondence.
        </p>
        <p>
          Support correspondence may be retained as needed to resolve the
          request. You may request its deletion by contacting
          <a href="mailto:gumedesduduzo@gmail.com" class="underline"
            >gumedesduduzo@gmail.com</a
          >.
        </p>
      </section>

      <section class="mt-4 flex flex-col gap-2">
        <h2 class="text-2xl font-semibold">Keeping and deleting data</h2>
        <p>
          Settings and app selections remain until you change or remove them.
          Clear Slim Launcher's storage in Android settings or uninstall it to
          remove its local app data. The app disables Android cloud backup;
          device-to-device transfers may still depend on your device
          manufacturer and Android version. The developer holds no server copy
          of your launcher data.
        </p>
      </section>

      <section class="mt-4 flex flex-col gap-2">
        <h2 class="text-2xl font-semibold">Questions and source code</h2>
        <p>
          For private support or privacy inquiries, contact Sdu (sduduzog) at
          <a href="mailto:gumedesduduzo@gmail.com" class="underline"
            >gumedesduduzo@gmail.com</a
          >. You can also use
          <a
            href="https://github.com/sduduzog/slim-launcher/issues"
            class="underline"
            >GitHub Issues</a
          >
          for general questions. Posts are public: do not include personal or
          sensitive information. Submissions are handled by GitHub under its
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            class="underline"
            >privacy statement</a
          >.
        </p>
        <p>
          Slim Launcher is
          <a href="https://github.com/sduduzog/slim-launcher" class="underline"
            >open source</a
          >. You can review the code to see how it works.
        </p>
      </section>
    </main>
  </div>
</template>

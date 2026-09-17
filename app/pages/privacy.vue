<script setup lang="ts">
useHead({
  title: 'Privacy Policy | Slim Launcher',
  meta: [
    {
      name: 'description',
      content:
        'How Slim Launcher uses installed-app information, stores settings locally, and lets you remove your launcher data.',
    },
  ],
})
</script>

<template>
  <div>
    <AppHeader />
    <main class="max-w-[48rem] mx-auto p-6 mt-12 flex flex-col gap-2">
      <h1 class="text-3xl font-bold">Privacy Policy</h1>
      <p>Last updated: <time datetime="2026-09-17">17 September 2026</time></p>
      <p>
        This policy covers the Slim Launcher Android app, maintained by Sdu
        (sduduzog).
      </p>
      <p>
        Slim Launcher has no internet permission, accounts, analytics,
        advertising, or telemetry. It does not send your launcher data to the
        developer or sell or share it with third parties.
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
          Shortcuts open other apps, such as the dialer, camera, calendar, and
          clock; Slim Launcher does not read their contents.
        </p>
        <p>
          The app requests the Ubuntu font from Google Play services, which may
          download it. That service operates under
          <a href="https://policies.google.com/privacy" class="underline"
            >Google's privacy policy</a
          >. Other apps and websites you open handle data independently of Slim
          Launcher.
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
          Contact Sdu (sduduzog) through
          <a
            href="https://github.com/sduduzog/slim-launcher/issues"
            class="underline"
            >GitHub Issues</a
          >
          for privacy questions. Posts are public: do not include personal or
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

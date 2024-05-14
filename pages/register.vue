<template>
  <form>
    <div class="mx-auto w-1/4 space-y-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        Registration
      </h2>
      <div class="sm:col-span-3">
        <div class="mt-2">
          <label
            for="first-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First name:</label
          >
          <input
            type="text"
            name="first-name"
            id="first-name"
            autocomplete="first-name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-3">
        <label
          for="last-name"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Last name:</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="last-name"
            id="last-name"
            autocomplete="family-name"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-4">
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >E-Mail:</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password:</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Confirm Password:</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <template>
        <UCheckbox color="blue" label="Remember me" :model-value="false" />
      </template>
    </div>
  </form>
</template>

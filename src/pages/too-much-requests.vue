<template>
    <div class="absolute top-0 left-0 w-full h-full bg-white">

        <section class="bg-primary py-[120px] relative z-10">
          <div class="container mx-auto">
            <div class="flex -mx-4">
              <div class="w-full px-4">
                <div class="mx-auto max-w-[400px] text-center dark:text-white">
                  <h2
                    class="font-bold mb-2 text-[50px] sm:text-[80px] md:text-[100px] leading-none"
                  >
                    429
                  </h2>
                  <h4 class="font-semibold text-[22px] leading-tight mb-3">
                    Too much requests
                  </h4>
                  <p class="text-lg mb-8">
                    It's okay to slow down !!
                  </p>
                  <button
                    @click="goHome"
                    class="text-base font-semibold inline-block text-center border rounded-lg px-8 py-3 hover:bg-gray-100 hover:text-primary dark:hover:text-black transition"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  </template>
  
  <script setup>
  function goHome() {
    const a = document.createElement("a");
    a.href = "/";
    a.click();
  }
  </script>
  
  <style lang="postcss" scoped></style>
  
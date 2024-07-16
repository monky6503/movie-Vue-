<script>
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  import lottie from 'lottie-web'
  export default {
    name: 'FavoriteList',
    data() {
      return {
        year: '',
        searchQuery: '',
        favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
      }
    },
    watch: {
      favoriteList: {
        handler() {
          localStorage.setItem(
            'favoriteList',
            JSON.stringify(this.favoriteList),
          )
        },
        deep: true, // 深度監聽，適用於監聽對象中的所有屬性
      },
    },
    mounted() {
      AOS.init()
      this.loadAnimation()
    },
    methods: {
      removeFavorites(movie) {
        const index = this.favoriteList.findIndex(
          (favMovie) => favMovie.imdbID === movie.imdbID,
        )
        this.favoriteList.splice(index, 1)
      },
      isFavorite(movie) {
        return this.favoriteList.some(
          (favMovie) => favMovie.imdbID === movie.imdbID,
        )
      },
      goBack() {
        this.$router.push('/')
      },
      loadAnimation() {
        lottie.loadAnimation({
          container: this.$refs.title,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'movieAnimation.json',
        })
      },
    },
    computed: {},
  }
</script>

<template>
  <main
    class="w-full min-h-screen bg-gradient-to-b from-[#F9F7F7] via-[#DBE2EF] via-[#3F72AF] to-[#112D4E]"
  >
    <div
      class="navbar bg-black flex items-center justify-between shadow-md fixed z-10 px-5"
    >
      <button @click="goBack" class="btn">GO Back</button>
      <p ref="title" class="text-4xl text-center px-3 w-52"></p>
      <div class="w-24"></div>
    </div>
    <div class="grid grid-cols-1 4xl:grid-cols-2 px-5 pt-20 pb-10">
      <div
        v-for="(movie, index) in favoriteList"
        :key="index"
        class="card md:card-side bg-base-100 shadow-xl w-full lg:w-9/12 xl:w-8/12 2xl:w-7/12 3xl:w-1/2 4xl:w-11/12 my-3 flex justify-between justify-self-center"
        data-aos="fade-down"
        data-aos-duration="500"
      >
        <figure class="py-7 md:px-5">
          <img :src="movie.Poster" alt="Movie" class="rounded-lg" />
        </figure>
        <div class="flex flex-col flex-1 justify-between p-3">
          <h2
            class="flex justify-center text-2xl text-center font-semibold py-2"
          >
            {{ movie.Title }}({{ movie.Year }})
          </h2>
          <div class="ml-auto relative p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="w-14"
            >
              <path
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                fill="#EFD767"
              />
            </svg>
            <span class="absolute left-[30px] top-[27px]">
              {{ movie.imdbRating === 'N/A' ? '' : movie.imdbRating }}
            </span>
          </div>
          <div>
            <ul class="pl-10 list-disc">
              <li class="p-2 list-side">Released: {{ movie.Released }}</li>
              <li class="p-2 list-outside">Runtime: {{ movie.Runtime }}</li>
              <li class="p-2 list-outside">Director: {{ movie.Director }}</li>
              <li class="p-2 list-outside">
                Writer: {{ movie.Writer.split(',').join('・') }}
              </li>
              <li class="p-2 list-outside">
                Actors: {{ movie.Actors.split(',').join('・') }}
              </li>
              <li class="p-2 list-outside">
                Language: {{ movie.Language.split(',').join('・') }}
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-between p-3">
            <div class="flex flex-wrap items-center gap-2">
              <div
                v-for="(text, index) in movie.Genre.split(',')"
                :key="index"
                class="badge badge-outline"
              >
                {{ text }}
              </div>
            </div>
            <div class="flex items-center justify-end p-2">
              <button
                @click="removeFavorites(movie)"
                type="button"
                class="btn btn-outline btn-error w-12 h-12 rounded-full"
              >
                <i
                  :class="isFavorite(movie) ? 'fa-solid' : 'fa-regular'"
                  class="fa-heart text-xl"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

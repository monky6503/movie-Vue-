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
          path: '../src/assets/movieAnimation.json',
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
        <div class="flex flex-col justify-between p-3">
          <h2
            class="flex justify-center text-2xl text-center font-semibold py-2"
          >
            {{ movie.Title }}({{ movie.Year }})
          </h2>
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
            <div class="flex items-center gap-2">
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

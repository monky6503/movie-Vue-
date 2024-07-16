<script>
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  import lottie from 'lottie-web'
  export default {
    name: 'MoviesSearch',
    data() {
      return {
        year: '',
        searchQuery: '',
        movies: [],
        favoriteList: JSON.parse(localStorage.getItem('favoriteList')) || [],
      }
    },
    mounted() {
      AOS.init()
      this.loadAnimation()
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
    methods: {
      getMovieData() {
        const apikey = 'c7bb566b'
        if (this.year === '' || this.searchQuery === '') {
          this.$swal.fire({
            icon: 'error',
            title: 'Please enter the movies and year',
          })
        } else {
          fetch(
            `https://www.omdbapi.com/?apikey=${apikey}&t=${this.searchQuery}&y=${this.year}&type=movie&plot=full`,
          )
            .then((response) => {
              return response.json()
            })
            .then((data) => {
              if (data.Error === 'Movie not found!') {
                this.$swal.fire({
                  icon: 'error',
                  title: data.Error,
                })
              } else {
                const movieExist = this.movies.some(
                  (movie) => movie.imdbID === data.imdbID,
                )
                if (movieExist) {
                  this.$swal.fire({
                    icon: 'warning',
                    title: 'This movie is already have!',
                  })
                } else {
                  this.movies.push(data)
                }
              }
            })
        }
      },
      toggleFavorites(movie) {
        const index = this.favoriteList.findIndex(
          (favMovie) => favMovie.imdbID === movie.imdbID,
        )
        if (index === -1) {
          this.favoriteList.push(movie)
        } else {
          this.favoriteList.splice(index, 1)
        }
      },
      isFavorite(movie) {
        return this.favoriteList.some(
          (favMovie) => favMovie.imdbID === movie.imdbID,
        )
      },
      goToFavorites() {
        this.$router.push('/favoritelist') //導到其他頁面
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
    class="w-full min-h-screen bg-[url('../src/assets/moviebackground.jpeg')] bg-cover bg-center"
  >
    <div
      class="navbar bg-black justify-center flex flex-col lg:flex-row shadow-md fixed z-10"
    >
      <p ref="title" class="text-4xl px-3 w-52"></p>
      <div class="flex items-center justify-center gap-2 flex-col md:flex-row">
        <label class="input input-bordered w-full flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="grow"
            placeholder="Search"
          />
        </label>
        <label class="input input-bordered w-full flex items-center gap-2">
          <input v-model="year" type="text" class="grow" placeholder="Year" />
        </label>
        <button
          @click="getMovieData"
          type="button"
          class="btn btn-warning w-full md:w-auto"
        >
          Search
        </button>
        <button
          @click="goToFavorites"
          class="btn btn-secondary w-full md:w-auto"
        >
          My Favorite
        </button>
      </div>
      <div><button type="button"></button></div>
    </div>
    <div
      class="grid grid-cols-1 4xl:grid-cols-2 px-5 pt-72 md:pt-32 lg:pt-20 pb-10"
    >
      <div
        v-for="(movie, index) in movies"
        :key="index"
        class="card md:card-side bg-base-100 shadow-xl w-full lg:w-9/12 xl:w-8/12 2xl:w-7/12 3xl:w-1/2 4xl:w-11/12 my-3 flex justify-around justify-self-center"
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
              <li class="p-2 list-side">
                <span class="font-bold">Released:&nbsp;</span>
                {{ movie.Released }}
              </li>
              <li class="p-2 list-outside">
                <span class="font-bold">Runtime:&nbsp;</span>
                {{ movie.Runtime }}
              </li>
              <li class="p-2 list-outside">
                <span class="font-bold">Director:&nbsp;</span>
                {{ movie.Director }}
              </li>
              <li class="p-2 list-outside">
                <span class="font-bold">Writer:&nbsp;</span>
                {{ movie.Writer.split(',').join('・') }}
              </li>
              <li class="p-2 list-outside">
                <span class="font-bold">Actors:&nbsp;</span>
                {{ movie.Actors.split(',').join('・') }}
              </li>
              <li class="p-2 list-outside">
                <span class="font-bold">Language:&nbsp;</span>
                {{ movie.Language.split(',').join('・') }}
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
                @click="toggleFavorites(movie)"
                type="button"
                class="btn btn-outline btn-error w-14 h-14 rounded-full"
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

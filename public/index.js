/**
 * The main run method for the client-side.
 */
function run () {
  if (document.getElementById('addDirector') !== null) {
    document.getElementById('addDirector').addEventListener('click', async (e) => {
      var posts = new XMLHttpRequest()
      /**
       * Redirect the request.
       */
      posts.onreadystatechange = () => {
        if (posts.readyState === 4 && posts.status === 200) {
          window.location = '/directors/add-director'
        }
      }
      posts.open('GET', '/directors/add-director', true)
      posts.send()
    })
  }

  if (document.getElementById('addMovie') !== null) {
    document.getElementById('addMovie').addEventListener('click', async (e) => {
      var posts = new XMLHttpRequest()
      /**
       * Redirect the request.
       */
      posts.onreadystatechange = () => {
        if (posts.readyState === 4 && posts.status === 200) {
          window.location = '/movies/add-movie'
        }
      }
      posts.open('GET', '/movies/add-movie', true)
      posts.send()
    })
  }

  if (document.getElementById('addSeries') !== null) {
    document.getElementById('addSeries').addEventListener('click', async (e) => {
      var posts = new XMLHttpRequest()
      /**
       * Redirect the request.
       */
      posts.onreadystatechange = () => {
        if (posts.readyState === 4 && posts.status === 200) {
          window.location = '/serieses/add-series'
        }
      }
      posts.open('GET', '/serieses/add-series', true)
      posts.send()
    })
  }
}

run()

/**
 * @author Jacob Yousif
 * The main entery point to the server.
 */

/**
 * The main run method for the client-side.
 */
function run () {
  onAdd('addDirector', '/directors/add-director')
  onAdd('addMovie', '/movies/add-movie')
  onAdd('addSeries', '/serieses/add-series')
  onAdd('addToBox', '/best-box/add-to-bestbox')
}

/**
 * It handels the add button and it makes a GET request to re-direct the page.
 *
 * @param {string}  btnName the name of the add button.
 * @param {string}  url for the re-direction.
 */
function onAdd (btnName, url) {
  if (document.getElementById(btnName) !== null) {
    document.getElementById(btnName).addEventListener('click', async (e) => {
      var posts = new XMLHttpRequest()
      /**
       * Redirect the request.
       */
      posts.onreadystatechange = () => {
        if (posts.readyState === 4 && posts.status === 200) {
          window.location = url
        }
      }
      posts.open('GET', url, true)
      posts.send()
    })
  }
}

run()

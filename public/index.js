
/**
 * The run method for the client-side.
 */
function run () {
  document.getElementById('addDirector').addEventListener('click', async (e) => {
    var posts = new XMLHttpRequest()
    /**
     * Redirect the request.
     */
    posts.onreadystatechange = () => {
      if (posts.readyState === 4 && posts.status === 200) {
        window.location = '/add-director'
      }
    }
    posts.open('GET', '/add-director', true)
    posts.send()
  })
}

run()

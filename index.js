const blogsDiv = document.getElementById("blogs")
const form = document.getElementById('blog-form')

const titleInput = form[0]
const contentInput = form[1]

const baseUrl = "http://localhost:3000"
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

document.addEventListener('DOMContentLoaded', function() {
  loadBlogs()
  form.addEventListener('submit', handleSubmit)
})



// EVENT HANDLERS
async function loadBlogs() {
  const resp = await fetch(baseUrl + '/blogs')
  const data = await resp.json()
  
  data.forEach(blog => {
    /* 
    <div>
      <h3>Title</h3>
      <p>content</p>
      <hr>
    </div>
    */

    displayBlog(blog)
  
    
  })

}

async function handleSubmit(event) {
  event.preventDefault()
  /*
  {
    "title": "A blog about coding",
    "content": "halp, something broke"
  }
  */

  // TODO: access author to get value for adding to database

  console.log(title.value)
  console.log(content.value)

  const blog = {
    title: title.value,
    content: content.value
  }

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(blog)
  }

  // make the POST request
  const resp = await fetch(baseUrl + "/blogs", options)
  const data = await resp.json()

  displayBlog(data)


  resetForm()
}


// HELPERS
function createTextElement(text, element) {
  const e = document.createElement(element)
  e.innerText = text
  return e
}

// TODO: add p tag for author to display
function displayBlog(blog) {
  const div = document.createElement('div')
  const h3 = createTextElement(blog.title, 'h3')
  const p = createTextElement(blog.content, 'p')
  const hr = document.createElement('hr')

  div.appendChild(h3)
  div.appendChild(p)
  div.appendChild(hr)

  blogsDiv.appendChild(div)
}

// TODO: Reset author value
function resetForm() {
  titleInput.value = ""
  contentInput.value = ""
}
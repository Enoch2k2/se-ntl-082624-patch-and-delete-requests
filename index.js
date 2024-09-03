const blogsDiv = document.getElementById("blogs")
const form = document.getElementById('blog-form')

let blogs = []
let editedBlog = null;

const titleInput = form[0]
const contentInput = form[1]
const submitBtn = form[2]

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
  
  blogs = data;

  displayBlogs()
    /* 
    <div>
      <h3>Title</h3>
      <p>content</p>
      <hr>
    </div>
    */

}

async function updateBlog() {
  const blog = {
    title: titleInput.value,
    content: contentInput.value
  }

  const resp = await fetch(baseUrl + "/blogs/" + editedBlog.id, {
    method: "PATCH",
    headers,
    body: JSON.stringify(blog)
  })

  const updatedBlog = await resp.json()

  blogs = blogs.map(function(blog) {
    // find if the old object is the same object as updated
    if(blog.id == updatedBlog.id) {
      // return the updated object instead of the old object
      return updatedBlog
    } else {
      return blog
    }
  })

  displayBlogs()
  resetForm()
  editedBlog = null


}

async function addBlog() {
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

  blogs.push(data)

  displayBlog(data)

  resetForm()
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
  if(editedBlog) {
    updateBlog()
  } else {
    addBlog()
  }  
}

function editBlog(event) {
  const blogId = event.target.dataset.blogId
  const blog = blogs.find(blog => blog.id == blogId)

  titleInput.value = blog.title
  contentInput.value = blog.content
  submitBtn.value = "update blog"
  editedBlog = blog
}

async function deleteBlog(event) {
  const blogId = event.target.dataset.blogId

  await fetch(baseUrl + "/blogs/" + blogId, {
    method: "DELETE"
  })

  blogs = blogs.filter(blog => blog.id != blogId)
  displayBlogs()
}

// HELPERS
function createTextElement(text, element) {
  const e = document.createElement(element)
  e.innerText = text
  return e
}

function displayBlogs() {
  resetBlogsDiv()
  blogs.forEach(blog => displayBlog(blog))
}

// TODO: add p tag for author to display
function displayBlog(blog) {
  const div = document.createElement('div')
  const h3 = createTextElement(blog.title, 'h3')
  const p = createTextElement(blog.content, 'p')
  const hr = document.createElement('hr')
  const editBtn = createTextElement('edit', 'button')
  const deleteBtn = createTextElement('delete', 'button')

  deleteBtn.dataset.blogId = blog.id
  editBtn.dataset.blogId = blog.id

  deleteBtn.addEventListener('click', deleteBlog)
  editBtn.addEventListener('click', editBlog)

  div.appendChild(h3)
  div.appendChild(p)
  div.appendChild(editBtn)
  div.appendChild(deleteBtn)
  div.appendChild(hr)


  blogsDiv.appendChild(div)
}

// TODO: Reset author value
function resetForm() {
  titleInput.value = ""
  contentInput.value = ""
  submitBtn.value = "create blog"
}

function resetBlogsDiv() {
  blogsDiv.innerHTML = ""
}
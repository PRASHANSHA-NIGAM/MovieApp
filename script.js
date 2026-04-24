const API_KEY = "43abbda1";

// 🎬 Search movie
async function searchMovie() {
  const query = document.getElementById("searchInput").value;

  if (!query) {
    alert("Please enter a movie name");
    return;
  }

  document.getElementById("loader").style.display = "block";

  const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("loader").style.display = "none";

    displayMovies(data.Search);
  } catch (error) {
    console.log(error);
  }
}

// 🎥 Display movies
function displayMovies(movies) {
  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = "";

  if (!movies) {
    moviesDiv.innerHTML = "<p>No movies found</p>";
    return;
  }

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="getDetails('${movie.imdbID}')">Details</button>
      <button onclick="toggleFavorite('${movie.imdbID}', '${movie.Title}')">❤️</button>
    `;

    moviesDiv.appendChild(div);
  });
}

// 📄 Get movie details (MODAL)
async function getDetails(id) {
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
  const data = await res.json();

  document.getElementById("modal").style.display = "block";

  document.getElementById("modalData").innerHTML = `
    <h2>${data.Title}</h2>
    <p>⭐ Rating: ${data.imdbRating}</p>
    <p>${data.Plot}</p>
  `;
}

// ❌ Close modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// ⌨️ Enter key support (SAFE)
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");

  if (input) {
    input.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        searchMovie();
      }
    });
  }
});

// ❤️ Save favorite to backend
function toggleFavorite(id, title) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  fetch("http://localhost:5000/api/auth/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      movieId: id,
      title: title
    })
  })
  .then(res => res.json())
  .then(data => alert(data.msg))
  .catch(err => console.log(err));
}
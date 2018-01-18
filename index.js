function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  "https://api.github.com/users/" + username + "/repos"
}

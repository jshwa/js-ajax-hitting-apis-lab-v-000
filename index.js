function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '- <a href="'+ r.html_url + '" target=_blank>URL</a> - <a href="#" data-repo="' + r.name + '" data-url="' + r.url + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `${el.dataset.url}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

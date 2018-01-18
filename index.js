function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(this.responseText)
  const repoList = `<ul>${repos.map(r =>
    '<li>' + r.name + '- <a href="'+ r.html_url + '" target=_blank>URL</a> - <a href="#" data-url="' + r.url + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + r.branches_url + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `${el.dataset.url}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `${el.dataset.branches_url}`)
  debugger
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  console.log(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

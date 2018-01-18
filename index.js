function getRepositories() {
  const username = document.getElementById("username").value;
  debugger
  console.log(username)
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open(`https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '- <a href="'+ r.html_url + '">URL</a> - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

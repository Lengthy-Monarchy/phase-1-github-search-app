document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repos-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchValue = document.getElementById('search').value;
        fetchUsers(searchValue);
    });

    function fetchUsers(searchValue) {
        fetch(`https://api.github.com/search/users?q=${searchValue}`, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error('Error:', error));
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${user.avatar_url}" width="50" height="50">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
                <button onclick="fetchRepos('${user.login}')">View Repos</button>
            `;
            userList.appendChild(li);
        });
    }

    window.fetchRepos = (username) => {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayRepos(data))
        .catch(error => console.error('Error:', error));
    };

    function displayRepos(repos) {
        repoList.innerHTML = '';
        repos.forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            repoList.appendChild(li);
        });
    }
});

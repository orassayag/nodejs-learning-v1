const getUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({
                id: id,
                gitHubUsername: 'Or'
            });
        }, 2000);
    });
};

const getRepositories = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
};

const getCommits = (repo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            reject(new Error('message'));
        }, 2000);
    });
};

const displayCommits = async () => {
    try {
        const user = await getUser(1);
        const repositories = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repositories[0]);
        console.log(commits);
    } catch (err) {
        console.log(err);
    }
};

console.log('Before')
displayCommits();
console.log('After');

/* console.log('Before');
getUser(1)
    .then((result) => {
        console.log(result);
        return getRepositories(result.gitHubUsername);
    })
    .then((result) => {
        console.log(result);
        return getCommits(result[0])
    })
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log('Error', err.message);
    });
console.log('After'); */




/* const getUser = (id, callback) => {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({
            id: id,
            gitHubUsername: 'Or'
        });
    }, 2000);
};

const getRepositories = (username, callback) => {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
};

const getRepositories = (user) => {
    getRepositories(user.gitHubUsername, getCommits);
}

const getCommits = (repository, callback) => {
    getCommits(repos, displayCommits)
};

const displayCommits = (commits) => {
    console.log(commits);
};

console.log('Before');
getUser(1, getRepositories);
console.log('After'); */
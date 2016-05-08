# yuuy
but the use of a config file with IdentityFile is pretty much your only option if you want to specify which identity to use for any git commands. This also opens up the very interesting concept of further segmenting your github keys on something like a per-project or per-organization basis:

```
Host github-project1
    User git
    HostName github.com
    IdentityFile ~/.ssh/github.project1.key</p>
Host github-org
    User git
    HostName github.com
    IdentityFile ~/.ssh/github.org.key</p>
Host github.com
    User git
    IdentityFile ~/.ssh/github.key
```
Which means that if I want to clone a repository using my organization credentials, I would use the following:

$ git clone git@github-org:orgname/some_repository.git
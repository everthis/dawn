# dawn

[![Build Status](https://travis-ci.org/everthis/dawn.svg?branch=master)](https://travis-ci.org/everthis/dawn)
[![Dependency Status](https://gemnasium.com/badges/github.com/everthis/dawn.svg)](https://gemnasium.com/github.com/everthis/dawn)
[![Coverage Status](https://coveralls.io/repos/github/everthis/dawn/badge.svg?branch=master)](https://coveralls.io/github/everthis/dawn?branch=master)
[![Code Climate](https://codeclimate.com/github/everthis/dawn/badges/gpa.svg)](https://codeclimate.com/github/everthis/dawn)

![dawn screenshot](https://github.com/everthis/dawn-ror/raw/master/screenshot.png "dawn screenshot")

## Prerequisites
* PostgreSQL
* Redis
* Nginx

## Installation

since PostgreSQL is used,

```bash
apt-get install libpq-dev
```

create role and database

```bash
sudo -u postgres createuser -d -P dawn_pg
sudo -u postgres createdb -O dawn_pg dawn_development
```
login to postgres on debian 
```bash
sudo -u postgres psql
```

alter database role password

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

install imagemagick

```bash
sudo apt-get update
sudo apt-get install imagemagick --fix-missing
```
disable tiff and dps on iDev machines
```bash
--without-diff --without-dps
```

install browserify 
```bash
npm install -g browserify
```
launch web server, rails livereload, front-end build system

```bash
bundle exec passenger start # OR 'rails s'
guard -P livereload
npm run dev:s # OR 'npm run dev:ss'
```

start in production mode

generate secret

```bash
 bundle exec rake secret
 export SECRET_KEY_BASE=result-of-previous-step
```
database migration

```bash
bundle exec rake db:migrate RAILS_ENV=production
```

```bash
bundle exec rake RAILS_ENV=production RAILS_GROUP=assets assets:precompile
bundle exec puma -p 3000 -e production # OR 'rails s -e production'
```
possible problems

```bash
cc1plus: error: unrecognized command line option "-std=c++0x"
```
fix:
```bash
echo 'export CXX=/usr/bin/gcc-5.3' >> ~/.bashrc
```

imagemagick installation failure on iDev, 
```bash
--without-tiff --without-dps
```

### Chrome HTTP2 

Chrome is dropping NPN support and only allows ALPN after 15.5.2016. ALPN is extension, which requires openssl 1.0.2 installed.
Go to `chrome://net-internals/#http2` to see details.

### SSH agent forwarding

`~/.bash_profile`
```bash
alias vultr='ssh vultr'
```

`~/.ssh/config`, watch out for `xxx` of alias `ssh xxx` and Host in `~/.ssh/config` must be the same, or `Permission denied (publickey).` error will raise when `ssh -T git@github.com`
```bash
Host vultr
  HostName everthis.com
  User everthis
  ForwardAgent yes
```
Highly recommend using `ssh-copy-id` for moving public keys around.

Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.

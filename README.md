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
bundle exec sidekiq -q default -q mailers # launch sidekiq
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

run redis-server 
```bash
redis-server ~/redis-stable/redis.conf
```

### start rails with UNIX sockets in development
```
bundle exec puma -C config/puma.rb
```

### nginx config
```
# www to non-www redirect -- duplicate content is BAD:
# https://github.com/h5bp/html5-boilerplate/blob/5370479476dceae7cc3ea105946536d6bc0ee468/.htaccess#L362
# Choose between www and non-www, listen on the *wrong* one and redirect to
# the right one -- http://wiki.nginx.org/Pitfalls#Server_Name
upstream app {
    # Path to Unicorn SOCK file, as defined previously
    server unix:/home/everthis/projects/dawn/shared/sockets/puma.sock fail_timeout=0;
}
upstream static_dev {
  server 127.0.0.1:8679;
}

server {
  # don't forget to tell on which port this server listens
  listen [::]:80;
  listen 80;

  # listen on the www host
  server_name www.example.com;

  # and redirect to the non-www host (declared below)
  return 301 $scheme://example.com$request_uri;
}

server {
  # listen [::]:80 accept_filter=httpready; # for FreeBSD
  # listen 80 accept_filter=httpready; # for FreeBSD
  # listen [::]:80 deferred; # for Linux
  # listen 80 deferred; # for Linux
  listen [::]:8678;
  listen 8678;

  # The host name to respond to
  server_name example.com;

  # Path for static files
  root /home/everthis/projects/dawn/public;

  try_files $uri/index.html $uri @app;

  # Specify a charset
  charset utf-8;

  # Custom 404 page
  error_page 404 /404.html;

  # Include the basic h5bp config set
  include h5bp/basic.conf;

  location / {
    proxy_pass http://app;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
  }

  location /assets {
    proxy_pass http://static_dev;

  }

}

```

### nginx websocket support

```
# enables WS support
location /cable {
	proxy_pass http://backend;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "upgrade";
}

run sidekiq in development
```bash
bundle exec sidekiq -e development -C config/sidekiq.yml
```
run sidekiq in production
```bash
bundle exec sidekiq -e production -q default -q mailers
```


deploy to production
```
cap production deploy
```

### PostgreSQL setup
```
./configure
make && sudo make install
```

configure systemd
```
sudo vim /etc/systemd/system/postgresql.service
```

```
[Unit]
Description=postgresql Database
After=network.target

[Service]
User=postgres
Type=forking
ExecStart=/usr/local/pgsql/bin/pg_ctl start -D /usr/local/pgsql/data -o "-c config_file=/usr/local/pgsql/data/postgresql.conf"
ExecReload=/bin/kill -s HUP $MAINPID


[Install]
WantedBy=multi-user.target
```

initdb
```
su postgres
/usr/local/pgsql/bin/initdb -E UTF8 -D /usr/local/pgsql/data
exit
```

start postgresql.service
```
sudo systemctl daemon-reload
sudo systemctl start postgresql.service
```

make postgresql.service start with system boot
```
sudo systemctl enable postgresql.service
```

create role and database
```bash
sudo -u postgres createuser -d -P dawn_pg
sudo -u postgres createdb -O dawn_pg -E UTF8 dawn_development
```

migrate development database
```
bin/rails db:migrate RAILS_ENV=development
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
Please make sure that `ssh-agent` is running on your dev machine. Especially for Windows users.

Highly recommend using `ssh-copy-id` for moving public keys around.

Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.

### gotchas

`gem install nokogiri -- --use-system-libraries` if bundle update rails errors.

`Peer authentication failed for user "xxxxx"` , this error occurs when you installed postresql on your server, but host is missing in database.yml. Just set host: localhost to database.yml,  otherwise if it's not localhost definitely tell that app where to find its database.


### Caveats
`bundle exec guard -P livereload -p` if you are on iDev machines. This `-p` force `Force usage of the Listen polling listener` 

execute postgresql command but get the following error while postgresql is running
```
psql: could not connect to server: No such file or directory
    Is the server running locally and accepting
    connections on Unix domain socket "/var/run/postgresql/.s.PGSQL.5432"?
```
OR
```
psql: could not connect to server: No such file or directory
    Is the server running locally and accepting
    connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```
method one: edit `postgresql.conf` and modify `unix_socket_directory`

method two: export `PGHOST`

method three: rebuild postgresql with `--host=HOST` set what you want.

method four: execute like this `PGHOST=localhost; psql`, which sets the variable and executes psq both at once.

method five: execute command with `-h` parameter, for example `psql -h /tmp/`

Since `Rails needs superuser privileges to disable referential integrity.`, you need to create a superuser role for `rails test`
```
sudo -u postgres createuser -d -s -P dawn_pg_test
```
then modify `.env.test` file with username and password.

### TODO
[optional] decode/encode URL , short link route to page directly.
[MUST] sync/async same content render, terminate duplicate code.

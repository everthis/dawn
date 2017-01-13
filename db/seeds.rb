# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User.create!(name:  "Example User",
#              email: "example@railstutorial.org",
#              password:              "foobar",
#              password_confirmation: "foobar",
#              admin:     true,
#              activated: true,
#              activated_at: Time.zone.now)

# 10.times do |n|
#   name  = Faker::Name.name
#   email = "example-#{n+1}@railstutorial.org"
#   password = "password"
#   User.create!(name:  name,
#               email: email,
#               password:              password,
#               password_confirmation: password,
#               activated: true,
#               activated_at: Time.zone.now)
# end

# users = User.order(:created_at).take(6)
# 10.times do
#   content = Faker::Lorem.sentence(5)
#   users.each { |user| user.microposts.create!(content: content) }
# end

# Following relationships
# users = User.all
# user  = users.first
# following = users[2..10]
# followers = users[3..10]
# following.each { |followed| user.follow(followed) }
# followers.each { |follower| follower.follow(user) }

# EmailWhitelist.create(email: "wwwaap@gmail.com")

# 1000.times do |n|
#   title  = Faker::Name.title
#   content = Faker::Lorem.paragraph(2)
#   Doc.create!(title:  title,
#               content: content,
#               user_id: 1,
#               created_at: Time.zone.now,
#               updated_at: Time.zone.now)
# end

User.create!(name:  "everthis",
             email: "admin@everthis.org",
             password:              "foobar",
             password_confirmation: "foobar",
             admin:     true,
             activated: true,
             activated_at: Time.zone.now)

10.times do |n|
  name  = "example-a-#{n+1}"
  email = "example-a-#{n+1}@everthis.com"
  password = "password"
  User.create!(name:  name,
              email: email,
              password: password,
              password_confirmation: password,
              activated: true,
              activated_at: Time.zone.now)
end

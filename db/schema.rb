# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170410074501) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apis", force: :cascade do |t|
    t.string   "uri"
    t.string   "method"
    t.string   "data"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "section"
    t.string   "name"
    t.string   "description"
    t.json     "nodes",       default: [], null: false
    t.json     "dimensions",  default: {}, null: false
    t.integer  "user_id"
    t.string   "mode"
    t.string   "debugAddr"
    t.string   "wikiLink"
    t.index ["user_id"], name: "index_apis_on_user_id", using: :btree
  end

  create_table "ci_package_logs", force: :cascade do |t|
    t.integer  "ci_plugin_id"
    t.json     "log"
    t.integer  "job_record_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["ci_plugin_id"], name: "index_ci_package_logs_on_ci_plugin_id", using: :btree
  end

  create_table "ci_packages", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "bin",                                            array: true
    t.string   "status"
    t.string   "input"
    t.string   "packageName"
    t.string   "packageVersion"
    t.string   "ciPackageName"
    t.string   "ciPackageVersion"
    t.string   "ciPackageNamePrefix"
    t.integer  "ciPackageVersionPatch", default: 0
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.index ["user_id"], name: "index_ci_packages_on_user_id", using: :btree
  end

  create_table "docs", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_docs_on_user_id", using: :btree
  end

  create_table "email_whitelists", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gists", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "description"
    t.text     "content"
    t.boolean  "hasAnswer"
    t.text     "answer"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["user_id"], name: "index_gists_on_user_id", using: :btree
  end

  create_table "microposts", force: :cascade do |t|
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "picture"
    t.index ["user_id", "created_at"], name: "index_microposts_on_user_id_and_created_at", using: :btree
  end

  create_table "npm_registries", force: :cascade do |t|
    t.string   "label"
    t.string   "registry_url"
    t.boolean  "checked"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
    t.index ["follower_id"], name: "index_relationships_on_follower_id", using: :btree
  end

  create_table "third_party_accounts", force: :cascade do |t|
    t.string   "account"
    t.boolean  "is_active"
    t.string   "account_cookies"
    t.string   "account_type"
    t.string   "env"
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["user_id"], name: "index_third_party_accounts_on_user_id", using: :btree
  end

  create_table "user_preferences", force: :cascade do |t|
    t.string   "locale"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_preferences_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "password_digest"
    t.string   "remember_digest"
    t.boolean  "admin",             default: false
    t.string   "activation_digest"
    t.boolean  "activated",         default: false
    t.datetime "activated_at"
    t.string   "reset_digest"
    t.datetime "reset_sent_at"
    t.string   "avatars"
    t.string   "auth_token"
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  create_table "uuap_login_logs", force: :cascade do |t|
    t.string   "tail"
    t.boolean  "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "apis", "users"
  add_foreign_key "ci_package_logs", "ci_packages", column: "ci_plugin_id"
  add_foreign_key "ci_packages", "users"
  add_foreign_key "docs", "users"
  add_foreign_key "gists", "users"
  add_foreign_key "third_party_accounts", "users"
  add_foreign_key "user_preferences", "users"
end

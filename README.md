# Travel Log Backend
This is the backend of travel log application.
It contains users who share the amazing experiences of their travels.

## Features
1. User can login via username and password.
1. User will be having a feeds section where he can view feeds of different users without generally following anyone sorted by latest time.
1. User can follow other users.
1. User can like, comment and share the posts.

## Techstack
1. Backend is built on nodejs.
1. Frontend is built on Reactjs.
1. DB is mongoDB.
1. Authentication is created using JWT.
1. Express for creating APIs.
1. Mail authentication.

## APIs

### /user
GET /user - Get details of the user.
POST /user - Create a new user.
PATCH /user - To update existing user.
DELETE /user - Delete an existing user.


### /isUnique
GET /isUnique - Check if username is unique or not

### /follow
POST /follow - Follow a particular user.

### /unfollow
POST /unfollow - Unfollow a particular user.

### /feed
GET /feed - Get the timeline feed.

### /post
POST /post - Create a new post
GET /post - Get a particular post
DELETE /post - Delete a particular post

### /like
POST /like - Like a particular post

### /unline
POST /unlike - Unlike a particular post

### /comment
POST /comment - Add a comment on a particular post
DELETE /comment - Delete a comment on a particular post
PATCH /comment - Update an existing comment on a particular post


## DB structure

### USERS
Fields will be:
1. Username - A unique username
1. First name - First name of user
1. Last name - Last name of user
1. DOB - Date of birth of user
1. Email - Email id of user
1. IsEmailVerified - If email is verified or not
1. EmailVerificationToken - Token for verifying email
1. Password - Password in encrypted format of user
1. Followers - Which users are following this user
1. Following - This user is following which users
1. Posts - Unique id of posts created by this user
1. Tokens - Login tokens of this user.
1. ProfilePicture - Profile picture of this user.
1. CreatedOn - Date on which user is created


### POSTS
1. Photo - Post photo
1. Caption - Caption of photo
1. LikedBy - Username of users who liked this photo.
1. Comments - Comments on this post along with username information.
1. CreatedOn - Creation datetime of post.

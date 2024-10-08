
# Document Management System

## Introduction [Demo](https://documentupload.vercel.app)
The Document Management System (DMS) is a web application that allows users to manage their documents efficiently. It provides features for authentication, document uploading, sharing, and a dashboard to showcase all uploaded or shared documents.


## Features
1. **Authentication:**
   - User registration and login functionalities.
2. **Dashboard:**
   - A user-friendly interface to showcase all documents that have been uploaded or shared.
3. **File Upload:**
   - Users can upload files, which are stored in the backend.
4. **File Sharing:**
   - Users can share uploaded files with other users and see the files shared with them.

## Technologies Used
- **Frontend:**
  - React.js
  - React Router (for routing)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for database)
  - JWT (for authentication)
- **Others:**
  - JavaScript 
  - HTML
  - CSS
  - tailwind css (for styling)


## Run Locally

Clone the project

```bash
  git clone https://github.com/pranavyemul76/documentupload.git
```

Go to the project directory

```bash
  cd documentupload
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
## API Reference


#### Register a new user
```http
POST /api/register
```
#### Log in a user

```http
  POST /api/login
```

#### Verify OTP
```http
POST /api/verify
```
#### Get users 

```http
 GET /api/userlist
```
#### Retrieve all documents for the logged-in user
```http
POST GET /api/documents
```
#### Upload a new document 

```http
 GET POST /api/upload
```
#### Share a document with another user 
```http
POST /api/share
```
#### Get uploaded files

```http
 GET /api/getuploads
```






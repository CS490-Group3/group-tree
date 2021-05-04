# Group 3 - Project 3

Heroku Link: 
- Sprint 1: https://secure-badlands-86419.herokuapp.com
- Sprint 2: https://aqueous-meadow-24998.herokuapp.com


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#deliverable">Deliverable</a></li>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#google-sign-in">Google Sign-in</a></li>
        <li><a href="#database">Database</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#local-deployment">Local Deployment</a></li>
      </ul>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <ul>
        <li><a href="#deploy-to-Heroku">Deploy to Heroku</a></li>
      </ul>
    </li>
  </ol>
</details>


## About the Project
[![Product Name Screen Shot][product-screenshot]](https://imgur.com/RGI0gIz) 
### Deliverable
We aim to deliver an app accessible from the browser. This app will help users to remember to check in on their family and friends. The app will provide a login to allow users create scheduled reminders, and features a list of contacts with details regarding their friends and family. The user is encouraged to complete reminders which will be rewarded with a growing-tree visualization.
### Motivation 
During the Covid-19 pandemic, being in touch with friends and family is a lot harder now, and this app will help users to stay connected with friends and family more easily. 
### Built with
- react-calendar library
- SQL database
- Flask  
- React/JS and Bootstrap 
- Google Login authentication API
- Heroku 

## Getting started
### Google Sign-In

This application uses the Google Sign-In API. You must [create authorization credentials](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials).

### Database

You need an SQL database for this application to work. At the time of writing, only PostgreSQL has been tested.

### Requirements

After cloning the repository, run the following commands to install the required libraries.

```sh
npm install
python3 -m pip install -r requirements.txt
```

### Local Deployment

Both the React and Flask apps require specific environment variables. There are two approaches to setting environment variables. The traditional way is to use the shell, e.g., in `sh` you would run the following command to set variable `FOO` to `bar`.

```sh
export FOO='bar'
```

The more "modern" way is to use a `.env` file. This is supported in Python via the third-party `python-dotenv` library and is supported natively by React. Both approaches will work for this project. Here are the required environment variables:

- `DATABASE_URL` - The URL of the database to use.
- `FLASK_LOGIN_SECRET_KEY` - Flask-Login uses this key to encrypt session cookies. This key can be any string of characters.
- `REACT_APP_CLIENT_ID` - This is the client ID you created for the Google Sign-In API.

After correctly setting the environment variables, build and run the project. The application should then be visible at [http://localhost:8081](http://localhost:8081).

```sh
npm run build
python3 -m app.app
```

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

### Deploy to Heroku

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

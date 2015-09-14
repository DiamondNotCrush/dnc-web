# Project Name

> DnC Media

## Team

  - __Product Owner__: Chris Griffis
  - __Scrum Master__: Owen Dismuke
  - __Development Team Members__: Ken Kim, Nate Parrish

## Table of Contents

1. [Project Overview] (#overview)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Project Overview
  Dnc Media is an open-source cloud solution for storing and accessing your music and movies. The project has 3 parts: 
    
  1. [Client Server](https://github.com/DiamondNotCrush/dnc-client)
  
  2. [Web Server](https://github.com/DiamondNotCrush/dnc-web)
  3. [Mobile App](https://github.com/DiamondNotCrush/dnc-mobile)
  
  The client server is installed on the user's computer that has access to all of their media. The user can easily signup, login and quickly do all the necessary setup needed to begin streaming their movies and music from the web or mobile app.
  
  The web server is used to store the user information and act as the "single-source-of-truth" for all authentication requests. A user can also use the web server to access their media when away from their main computer.
  
  The mobile app is just another easy way for a user to access their files.
  
## Usage

This repo contains the web client for DnC Media. The web client acts as the API for all necessary user actions (ie. login/authentication, signup, client connection validation, etc.) The web client is written in javascript on a Node.js/Express/MySQL backend and Angular.js for the front-end. This client will run on any server that supports Node.js and MySQL.

## Requirements

The only requirements to run this client are a server that can support Node.js and a MySQL database. There will be some hardcoded API calls from the client server and mobile app that will need to be changed to the new URL of this web client.

## Development

### Installing Dependencies

To install dependencies, for this client, run ```npm install```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

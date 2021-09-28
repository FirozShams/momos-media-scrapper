# Momos Media Scrapper

This repo consists of the containerized backend and frontend applications for momos media scrapper

## Requirements

Docker, Docker Compose, npm, node

## Installation

```bash
cd api
npm install

cd ../web
npm install
```

## Run Applications

```python
docker-compose up --build
```

## Usage
Backend API Endpoint - http://localhost:3000

Frontend Application - http://localhost:5000

## Backend API Endpoints
- Base Endpoint: http://localhost:3000
- Login: http://localhost:3000/auth/login

  Request Body: {"username":"momos","password":"momos123"} // please use this username and password combo for login in frontend as well
  
  Response Body: {"success":true,"message":"OK","data":{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbW9zIiwic3ViIjoiOTBlOTUyMDktYjIyOS00YTA5LTg1OTktNDI5ZmJkMWI1ZjJkIiwiaWF0IjoxNjMyODM2ODA3LCJleHAiOjE2MzI4Mzc3MDd9.xxoLuj3F8PWYO4I0sC_pzR-6HWNjPnvGtopMSZca43Q"}}

- Get All Media: http://localhost:3000/media/from-urls

  Query Params: page:int, limit:int, search:string, type:string  
  
  Response Body: {"success":true,"message":"OK","data":[{"id":"86ce2f85-426c-4453-bb6d-70e4fabfec62","name":"small.mp4","type":"video","created_at":"2021-09-27T21:16:19.527Z"},{"id":"887d2cc9-637b-4796-b5a5-a40a04644a9d","name":"cat-black-superstitious-fcs-cat-myths-162286659.jpg","type":"image","created_at":"2021-09-27T20:46:54.436Z"}],"meta":{"count":2}}


- Add Media From Urls: http://localhost:3000/media/from-urls

  Request Body: ["http://techslides.com/demos/sample-videos/small.mp4"]
  
  Response Body: {"success":true,"message":"1 item(s) added for scrapping. Come back later to view the scrapped files","data":{}}

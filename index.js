import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "leo08061999";
const yourPassword = "123";
const yourAPIKey = "aa6978fd-ba8e-49fc-9527-bd40ad5670cd";
const yourBearerToken = "c100a53f-f953-439b-a4ab-53f5596a8f39";

app.get("/", (req, res) => {
  res.render("index.ejs", {content: "API Response."});
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try{
    const response = await axios.get(API_URL + "random")
    const results = JSON.stringify(response.data)
    res.render("index.ejs", {content: results})    
  }
  catch (error){
    console.error("Error: ", error.message)
    res.render("index.ejs", {content: "Error."});
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try{
    const response = await axios.get(API_URL + "all?page=2", {
      auth: {
        username: yourUsername, 
        password: yourPassword
      }})
    const results = JSON.stringify(response.data)
    res.render("index.ejs", {content: results})
  }
  catch(error){
    console.error("Error: ", error.message)
    res.render("index.ejs", {content: "Error"})
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try{
    const response = await axios.get(API_URL + "filter?score=5&apiKey=" 
      + yourAPIKey)
    const results = JSON.stringify(response.data)
    res.render("index.ejs", {content: results})
  }
  catch(error){
    console.error("Error: ", error.message)
    res.render("index.ejs", {content: "Error"})
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 try{
    const response = await axios.get(API_URL + "secrets/42", {
      headers: { 
        Authorization: `Bearer ` + yourBearerToken
      }})
    const results = JSON.stringify(response.data)
    res.render("index.ejs", {content: results})
 }
 catch(error){
    console.error("Error: ", error.message)
    res.render("index.ejs", {content: "Error"})
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

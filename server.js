var express = require ("express")
var app = express ()
var request = require ("request")
var cheerio = require ("cheerio")
var Article = require("./model/article")

var mongoose = require ("mongoose")
mongoose.connect("mongodb://user123:user123@ds155292.mlab.com:55292/web-scraper")

app.get ("/",function(req, res){
    res.send("works")
})

app.get ("/scrape",function(req, res){

    request("https://www.indeed.com/jobs?q=web+developer&l=Tempe%2C+AZ", function(error, response, body){
        //res.send(body)
    
        var $ = cheerio.load(body)
        var array = []
        $(".result").each(function(){
            console.log("works")
            var title = $(this).children("h2").children("a").text()
            var link = $(this).children("h2").children("a").attr("href")
            var summary = $(this).children("table").children("tbody").children("tr").children("td").children("div").children(".summary").text()
            if (title){
                array.push({title: title, link: link, summary: summary})
                var article = new Article ({title: title, link: link, summary: summary})
                article.save()
            }          
           
        })
        res.send(array)
    })
    app.get("/all", function(req, res){
        Article.find().then(function(response){
            res.send(response)
        })
    })
    
    
})

app.listen(3000)

module.exports = function(app) {

  //this is our Cat model
  var Cat = require('./cat')

  //home page: list al the cats
  app.get('/', function(req, res) {

    //find all the cats then render
    //catList passing it our found cats
    Cat.find({}, function(err, cats) {
      res.render('catList.ejs',{cats:cats})
    });

  });

  var hundredNames = ["Bella", "Tigger", "Chloe", "Shadow", "Luna", "Oreo", "Oliver", "Kitty", "Lucy", "Molly",
    "Jasper", "Smokey", "Gizmo", "Simba", "Tiger", "Charlie", "Angel", "Jack", "Lily",
    "Peanut", "Toby", "Baby", "Loki", "Midnight", "Milo", "Princess", "Sophie", "Harley",
    "Max", "Missy", "Rocky", "Zoe", "Coco", "Misty", "Nala", "Oscar", "Pepper", "Sasha",
    "Buddy", "Pumpkin", "Kiki", "Mittens", "Bailey", "Callie", "Lucky", "Patches", "Simon",
    "Garfield", "George", "Maggie", "Sammy", "Sebastian", "Boots", "Cali", "Felix", "Lilly",
    "Phoebe", "Sassy", "Tucker", "Bandit", "Dexter", "Fiona", "Jake", "Precious", "Romeo",
    "Snickers", "Socks", "Daisy", "Gracie", "Lola", "Sadie", "Sox", "Casper", "Fluffy",
    "Marley", "Minnie", "Sweetie", "Ziggy", "Belle", "Blackie", "Chester", "Frankie",
    "Ginger", "Muffin", "Murphy", "Rusty", "Scooter", "Batman", "Boo", "Cleo", "Izzy",
    "Jasmine", "Mimi", "Sugar", "Cupcake", "Dusty", "Leo", "Noodle", "Panda", "Peaches"];
  var catBreeds = ["Abyssinian", "American Bobtail", "American Curl", "American Shorthair",
"American Wirehair", "Balinese", "Bengal Cats", "Birman", "Bombay", "British Shorthair",
"Burmese", "Burmilla", "Chartreux", "Chinese Li Hua", "Colorpoint Shorthair",
"Cornish Rex", "Cymric", "Devon Rex", "Egyptian Mau", "European Burmese", "Exotic",
"Havana Brown", "Himalayan", "Japanese Bobtail", "Javanese", "Korat", "LaPerm",
"Maine Coon", "Manx", "Nebelung", "Norwegian Forest", "Ocicat", "Oriental", "Persian",
"Pixie-Bob", "Ragamuffin", "Ragdoll Cats", "Russian Blue", "Savannah", "Scottish Fold",
"Selkirk Rex", "Siamese Cat", "Siberian", "Singapura", "Snowshoe", "Somali", "Sphynx",
"Tonkinese", "Turkish Angora", "Turkish Van"];
  //display (GET) the addCat page
  app.get('/addCat', function(req,res) {

    res.render("addCat.ejs", {randomName:hundredNames[Math.floor(Math.random()*100)],
      randomBreed:catBreeds[Math.floor(Math.random()*42)], randomAge:Math.floor(Math.random()*342)})
      //the oldest cat was 38. 38x9 lives = 342
  })

  //handle the submit (POST) on adding a cat
  app.post('/addCat', function(req,res) {

    //grab value from the submitted request object
    var catName = req.body.catName
    var catBreed = req.body.catBreed
    var catAge = req.body.catAge

    //create and save our cat, just like creating an object
    var newCat = new Cat({ name: catName, breed: catBreed, age: catAge });
    newCat.save(function (err) {

      console.log("saved: " + newCat.name + ", " + newCat.breed + ", " + newCat.age)


      //I use res.redirect so that it doesn't stay on /addCat after you've
      //submitted the cat. If it stays there and you reload, it thinks
      //you're resubmitting the form.
      res.redirect('/')

      //finding cats again and rendering page
      /*Cat.find({}, function(err, cats) {

        res.render('catList.ejs',{cats:cats})
      });*/

    })

  })

  app.get('/deleteAll', function(req, res){
    console.log("dropping tables... (╯°. °）╯︵ ┻━┻")
    Cat.remove({}).exec();
    res.redirect('/')
  })

}

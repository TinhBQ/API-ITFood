const express = require('express');
const dotenv = require('dotenv');
const connect = require('./database/database.js')
const { categoryModel } = require('./models/index.js')
const { OutputType, print } = require('./helpers/print.js');

const app = express();
app.use(express.json())
dotenv.config();

connect()
  .then(async () => {
    const myCategory = [
      {
        "name": "Pizza",
        "image": "https://pngimg.com/uploads/pizza/pizza_PNG7151.png"
      },
      {
        "name": "Burger",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1299&q=80"
      },
      {
        "name": "Sushi",
        "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
      },
      {
        "name": "Ramen",
        "image": "https://img.freepik.com/free-vector/ramen-noodle-egg-meat-with-chopstick-cartoon_138676-2543.jpg?w=1060&t=st=1681920670~exp=1681921270~hmac=a687b9ee92ef19b62987a5677a13a72cf0993b20db7e70e6b1989e8880657ade"
      },
      {
        "name": "Tacos",
        "image": "https://cdn.pixabay.com/photo/2013/07/13/09/37/taco-155812__340.png"
      },
      {
        "name": "Steak",
        "image": "https://images.unsplash.com/photo-1588347818036-558601350947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      },
      {
        "name": "Fried chicken",
        "image": "https://images.unsplash.com/photo-1626082896492-766af4eb6501?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      },
      {
        "name": "Seafood",
        "image": "https://images.unsplash.com/photo-1562158079-e4b9ed06b62d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      },
      {
        "name": "Pasta",
        "image": "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        "name": "Salad",
        "image": "https://media.istockphoto.com/id/175197961/vi/anh/%C4%91%C4%A9a-salad.jpg?s=612x612&w=0&k=20&c=iPicN3ZCM6Grs4Zw6EANfCHqbnza6mFVPDxL3fOIsew="
      },
      {
        "name": "Sandwich",
        "image": "https://media.istockphoto.com/id/1256670482/photo/turkey-sandwich-with-tomato-and-lettuce.jpg?s=612x612&w=0&k=20&c=CPwIFBHQqOob3SNZbegKKjUVL6xkUZgoQ2cxT0jcUrQ="
      },
      {
        "name": "BBQ",
        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVxdWV8ZW58MHx8MHx8&w=1000&q=80"
      },
      {
        "name": "Dessert",
        "image": "https://media.istockphoto.com/id/497959594/photo/fresh-cakes.jpg?s=612x612&w=0&k=20&c=T1vp7QPbg6BY3GE-qwg-i_SqVpstyHBMIwnGakdTTek="
      },
      {
        "name": "Soup",
        "image": "https://media.istockphoto.com/id/1177031727/photo/pumpkin-and-carrot-soup-with-cream-on-grey-stone-background-top-view.jpg?s=612x612&w=0&k=20&c=HmxXL082ccHLy1KAKJxyD-bMcvzTV-OrpoBhtUhV500="
      },
      {
        "name": "Breakfast",
        "image": "https://media.istockphoto.com/id/533645537/photo/breakfast-with-bacon-eggs-pancakes-and-toast.jpg?s=612x612&w=0&k=20&c=TumrEwImmLi4TIVeirgynvTpHhyvt9LeiDXLci45NWg="
      }];

    const isExist = await categoryModel.insertMany(myCategory);
    if (isExist) {
      print('Init category successfully', OutputType.SUCCESS);
    } else {
      print('Init category failed', OutputType.ERROR);
    }
  })
  .then(async () => {
    
  })
  .catch(err => {
    print('Init category failed', OutputType.ERROR);
  });
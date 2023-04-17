const Joi = require('joi');
const express = require('express');
const app = express();
const Port = 7000;

app.use(express.json());



const courses = [
    {id:1, name: 'iphone', price:'$1200'},
    {id:2, name: 'samsung', price:'$100'},
    {id:3, name: 'nokia', price:'$500'},
    {id:4, name: 'motorola', price:'$700'},
    {id:5, name: 'iqoo', price:'$500'},
    {id:6, name: 'alcatel', price:'$60'},
    {id:7, name: 'realme', price:'$400'},
    {id:8, name: 'redmi', price:'$350'},
    {id:9, name: 'vivo', price:'$900'}
]
app.get('/',(req,res)=>{
    res.send('Hello World!!!');
});

app.get('/api/products',(req,res) => {
    res.send(courses);
})

app.get('/api/products/:id', (req,res)=>{
   
    const course = courses .find(c => c.id === parseInt(req.params.id));
    if(!course) 
      res.status(404).send('The course with the given ID was not found');

    res.send(course);
})

app.post('/api/products', (req,res)=>{
   const schema = {
    name: Joi.string().min(3).required()
   };
   
   const result = Joi.validate(req.body, schema);
   console.log(result);

   if(result.error) {
       res.status(400).send(result.error);
       return;
   }
    const course = {
        id:courses.length + 1,
        name: req.body.name
   }
   courses.push(course);
   res.send(course);
});

app.put('/api/products/:id', (req,res)=>{
   
   const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) 
      res.status(404).send('The course with the given ID was not found');
  
    console.log(course);
    const result = validateCourse(req.body); // error
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }



   course.name = req.body.name;
   res.send(course);

});

function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};

app.listen(Port, (err)=>{
    if(err){
        console.log("There is an error in the server");
    }
    console.log(`server up and running on port: ${Port}`);

})
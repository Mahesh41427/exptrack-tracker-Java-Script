const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT
const Expense = require('./expense');
mongoose.connect('mongodb+srv://kishorek27:kishore27@cluster0.6slsaqa.mongodb.net/newDb?retryWrites=true&w=majority',{
    useUnifiedTopology: true
});

app.use(express.json());
app.get('/expenses', async(req, res) => {
  const result=await Expense.find()
  res.send(result)
})


app.post('/expenses', async(req, res) => {
  console.log(req.body);
  const newExpense = req.body;
  await Expense.create(newExpense);
  const result1=await Expense.find()
  //res.send(result1)
  res.send('Created');
})

// app.get('/expense/:id', async (req, res) => {
//   try{
//   const id = req.params.id;
//   const result = await Expense.findById(id);
//   if(result)
//         res.send(result);
//   else
//       res.send(("No expense with that id"));
//   }catch(err){
//     res.send(err);
//   }
// })

app.delete('/expense/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const result = await Expense.findByIdAndDelete(id);
    if(result)
          res.send(result);
    else
        res.send(("No expense with that id"));
    }catch(err){
      res.send(err);
    }
  })


  app.put('/expense/:id',async(req,res) => {
    const id = req.params.id;
    const updateObject = req.body;
    const updatedObject = await Expense.findByIdAndUpdate(id,{$set: updateObject},{
      new: true
    })
    res.send(updatedObject)
  
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

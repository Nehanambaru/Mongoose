// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/sampledb')
//   .then(() => console.log("Connected to sampledb"))
//   .catch(err => console.error(err));

// const studentSchema = new mongoose.Schema({
//   name: String,
//   rno: Number,
//   branch: String
// });

// const Student = mongoose.model('Student', studentSchema);

// async function run() {
//   // Insert
//   const s1 = new Student({ name: "Ramu", rno: 103, branch: "CSE" });
//   await s1.save();
//   console.log("Inserted:", s1);

//   // Read
//   const students = await Student.find();
//   console.log("All students:", students);

//   // Update
//   const updated = await Student.findOneAndUpdate(
//     { rno: 103 },
//     { branch: "IT" },
//     { new: true }
//   );
//   console.log("Updated:", updated);

//   // Delete
//   const result = await Student.deleteOne({ rno: 103 });
//   console.log("Deleted:", result);

//   mongoose.connection.close();
// }

// run();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sampledb')
  .then(() => console.log("Connected to sampledb"))
  .catch(err => console.error(err));

const studentSchema = new mongoose.Schema({
  name: String,
  rno: Number,
  branch: String
});

const Student = mongoose.model('Student', studentSchema);
app.get('/', (req, res) => {
  res.send("Welcome! Server is running.");
});


// Routes
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

app.put('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Student deleted" });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));









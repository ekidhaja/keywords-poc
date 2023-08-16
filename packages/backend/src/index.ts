import express from 'express';
import cors from 'cors';
import { UsersTable, BusinessProfile, BusinessTable } from './db';

const app = express();
const port = 4000;

app.use(express.json({ limit: '20mb' }))
app.use(cors());

app.get('/keywords/:tenantId', (req, res) => {
    const tenantId = req.params.tenantId;
    const business = BusinessTable.find(b => b.tenantId === tenantId);
    if (!business) return res.status(404).send("Business not found");
    res.send({ keywords: business.keywords });
});
  
app.put('/keywords/:tenantId', (req, res) => {
    console.log('request gotton is: ', req.params)
    const tenantId = req.params.tenantId;
    const business = BusinessTable.find(b => b.tenantId === tenantId);
    console.log('tenantId: ', tenantId, 'business is: ', business)
    if (!business) return res.status(404).send("Business not found");
    business.keywords = req.body.keywords; 
    console.log('tenantId: ', tenantId, 'business updated is : ', business)
    res.send({ message: "keywords updated"});
});

// // Fetch BSO list for dropdown
// app.get('/bsos', (req, res) => {
//   res.send(BusinessTable);
// });

// // Fetch BOs for a specific BSO
// app.get('/bos/:tenantId', (req, res) => {
//   const tenantId = req.params.tenantId;
//   const bos = UsersTable.filter(user => user.type === 'BO' && user.tenantId === tenantId);
//   res.send(bos);
// });

app.get('/all-users', (req, res) => {
    res.status(200).json(UsersTable);
});

// // Login endpoint to authenticate and return the user data
// app.post('/login', (req, res) => {
//   const { userId } = req.body;
//   console.log('data received is: ', req.body)
//   const user = UsersTable.find(u => u.userId === userId);
//   if (!user) return res.status(404).send({ message: "User not found" });
//   res.send(user);
// });

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
  
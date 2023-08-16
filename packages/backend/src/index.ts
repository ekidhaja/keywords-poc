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

app.get('/all-users', (req, res) => {
    res.status(200).json(UsersTable);
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
  
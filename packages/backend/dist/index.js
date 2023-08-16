"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json({ limit: '20mb' }));
app.use((0, cors_1.default)());
app.get('/keywords/:tenantId', (req, res) => {
    const tenantId = req.params.tenantId;
    const business = db_1.BusinessTable.find(b => b.tenantId === tenantId);
    if (!business)
        return res.status(404).send("Business not found");
    res.send({ keywords: business.keywords });
});
app.put('/keywords/:tenantId', (req, res) => {
    console.log('request gotton is: ', req.params);
    const tenantId = req.params.tenantId;
    const business = db_1.BusinessTable.find(b => b.tenantId === tenantId);
    console.log('tenantId: ', tenantId, 'business is: ', business);
    if (!business)
        return res.status(404).send("Business not found");
    business.keywords = req.body.keywords;
    console.log('tenantId: ', tenantId, 'business updated is : ', business);
    res.send({ message: "keywords updated" });
});
app.get('/all-users', (req, res) => {
    res.status(200).json(db_1.UsersTable);
});
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

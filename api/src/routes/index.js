const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    sendCountryes, 
    CountryId,
    sendActivity,
    PostCountries,
    PutCountry,
    DeleteActivity
} = require('../controller/functions.js')

// const {sendCountryes}=require('../controller/sendCountryes.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/countries', getAllCountries)
router.get('/country', sendCountryes)
router.get('/countries/:id',CountryId)
router.get('/activity', sendActivity)
router.post('/activities', PostCountries)
router.put('/countries/:id',PutCountry)
router.delete('/Activity/:id', DeleteActivity)

module.exports = router;

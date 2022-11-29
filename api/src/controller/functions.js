const { Router } = require('express')
const {Country, Activity, cache} = require('../db');

const axios=require('axios')
const API_ALL_URL = 'https://restcountries.com/v3/all';

const getAllCountries = async () => {
    try {
        const getCount = await axios.get('https://restcountries.com/v3/all');
        const getInfo = await getCount.data.map(el => {
            return {
                id: el.cca3,
                name: el.name.common,
                flags: el.flags[1],
                continents: el.continents? el.continents[0] : el.continents[0] = 'data not found',
                capital: el.capital? el.capital[0] : el.capital = 'data not found',
                subregion: el.subregion? el.subregion : el.subregion = 'data not found',
                area: el.area,
                population: el.population
            }
        })
        return getInfo
    } catch (error) {
        console.log(error)
    }
}

async function uploadCountry(){
    try {
        const countr = await getAllCountries();
        const countDb = await Country.findAll();
        if(!countDb.length) {
            const createCount = await Country.bulkCreate(countr)
            return createCount
        }else{
            return countDb;
        }
    } catch (error) {
        console.log(error)
    }
}

const sendCountryes = async (req, res, next)=>{
    try {
        const name = req.query.name
        const allCountry = await  uploadCountry();
        if(name){
            const countryName = await allCountry.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()))
            countryName.length?
            res.status(200).send(countryName) :
            res.json({ err: 'NOT able to store data in database' });
        }else{
            res.status(200).send(allCountry)
        }
    } catch (error) {
        next(error)
    }
}

const CountryId = async (req,res,next)=>{
    const { id } = req.params;
    if(!id) next(new Error('Please Type the ID'))
    try {
        
        if(!cache.allCountries) await getAllCountries();
        const country = await Country.findByPk(id, {include:Activity});
        if(!country) return res.status(400).send({error:'The ID is invalid'})
        res.status(200).send(country)
    } catch(error){
        res.status(400).send(error)
    }
}

const sendActivity = async (req, res,next)=>{
    try {
        const findActivity = await Activity.findAll({             
           include: {
               model: Country,

            }
        })
        return res.json(findActivity)
    } catch (error) {
        next(error)
    }
    
}

const PostCountries = async (req, res, next)=>{
    // const {name, difficulty, duration, season, countries}=req.body

    // try {
    //     if(!name || !difficulty || !duration || !season || !countries) return res.status(400).send({error: "Wrong data"})
    //     if(!cache.allCountries) await getAllCountries();
    // } catch (error) {
    //     next(error)
    // }

    // Activity.create({name, difficulty, duration, season})
    //     .then(activity=>{
    //         countries.forEach(id =>{
    //             Country.findByPk(id).then(async country =>{
    //                 await country.addActivity(activity)
    //             }).catch(err=>{
    //                 console.log(err)
    //             })
    //             const cacheCountry=cache.allCountries.find(c=>c.id===id);
    //             cacheCountry.dataValues.Activities.push(activity)
    //         })
    //         return res.status(200).send(activity)
    //     }).catch(error=>{
    //         if (error.name === 'SequelizeUniqueConstraintError') return res.status(500).send('Activity already exists.');
    //         res.status(500).send(error.message);
    //     })
    try {
        const { name, difficulty, duration, season, country } = req.body

        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        })
        country.map( async (count) => {
            const countryDb = await Country.findOne({
                where: {
                    name: count
                }
            })
            newActivity.addCountry(countryDb)
        })
        //res.json(newActivity)
        res.status(200).send('Activity created successfully') 
    } catch (error) {
        next(error)
    } 

}

const PutCountry = async (req, res,next)=>{
    const {id}=req.params;
    try {
        const activity = await Activity.findByPk(id);
        if(!activity) res.send({error:`Not Exist with that ${id}`})

        const {name, difficulty, duration, season} = req.body;

        if(name) activity.name = name;
        if(difficulty) activity.difficulty = difficulty;
        if(duration) activity.duration = duration;
        if(season) activity.season = season

        await activity.save();
        res.send(activity);
    }catch (err)
    {
        next(err)
    }
}

const DeleteActivity = async(req, res, next)=>{
    const {id} = req.params;
    try {
        const activity = await Activity.destroy({where:{
            id
        }});
        if(activity > 0) return res.send({msg: "Activity DELETED"})
        res.send({msg:"Not Exist the Activity"})
    }catch(err){
        next(err)
    }
}
        

module.exports = {
    getAllCountries, 
    sendCountryes,
    CountryId,
    sendActivity,
    PostCountries,
    PutCountry,
    DeleteActivity

}
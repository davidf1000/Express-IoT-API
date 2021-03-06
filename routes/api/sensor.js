const express = require('express');
const DataSensor = require('../../Schema/DataSensor');
const router = express.Router();
// @route     GET api/sensor/all
// @desc       Get detailed data sensors for all 
// @access      Public

router.get('/all',async (req, res) => {
    try{
        data= await DataSensor.find({});
        // console.log(data);
        //get Every unique set 
        const set=data.map(data=>data.sensor).filter((v, i, a) => a.indexOf(v) === i);
        console.log(set);
        // data.filter(data.sensor===sensor).map(data=>data.time)
        const dataArray = set.map(name=>data.filter(data=>data.sensor===name).map(data=>data.data).slice(0,8));
        const dataDate= set.map(name=>data.filter(data=>data.sensor===name).map(data=>data.time).slice(0,8));
        const newObject={
            sensor:set,
            data:dataArray,
            date:dataDate
        }
        const newObject2=set.map((item,idx)=>({
            sensor:item,
            data:dataArray[idx],
            date:dataDate[idx]
        }));
        res.json(newObject2);
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
});
// @route     GET api/sensor
// @desc       Get All Data Sensor 
// @access      Public

router.get('/',async (req, res) => {
    try{
        data= await DataSensor.find({});
        // const x= new Date(data[0].time);
        // const dateformated= `${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`;
        // console.log(dateformated);
        res.json(data);
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
});

// @route     POST api/sensor
// @desc       POST Sensor Data
// @access      Public

router.post('/',async (req, res) => {
    try{
        const data = new DataSensor({
            data:Number(req.body.data),
            sensor:req.body.sensor
        });
        await data.save();
        res.json({msg:"Post Data Success !"});
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
}); 
// @route     DELETE api/sensor
// @desc       DELETE ALL Sensor Data
// @access      Public

router.delete('/',async (req, res) => {
    try{
        await DataSensor.deleteMany({});
        res.json({msg:"Delete ALL Data Success !"});
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
}); 
// @route     GET api/sensor/:sensorname
// @desc       Get Sensor Data by name
// @access      Public

router.get('/:sensorname',async (req, res) => {
    try{
        const data=await DataSensor.find({sensor:req.params.sensorname});
        res.json(data);
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
}); 

// @route     DELETE api/sensor/:sensorname
// @desc       Delete all Sensor Data by name
// @access      Public

router.delete('/:sensorname',async (req, res) => {
    try{
        await DataSensor.deleteMany({sensor:req.params.sensorname});
        res.json({msg:"Delete Sensor Success !"});
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
}); 
// @route     GET api/sensor/:sensorname/la
// @desc       GET latest Sensor Data by name
// @access      Public

router.get('/:sensorname/la',async (req, res) => {
    try{
        const data=await DataSensor.findOne({sensor:req.params.sensorname}).sort('-time');
        res.json(data);
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
}); 
// @route     GET api/sensor/:sensorname/lat
// @desc       GET x latest Sensor Data by name
// @access      Public

router.get('/:sensorname/lat/:num',async (req, res) => {
    try{
        const data=await DataSensor.find({sensor:req.params.sensorname}).sort('-time').limit(parseInt(req.params.num));
        res.json(data);
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error ! ');
    }
}); 


module.exports = router;


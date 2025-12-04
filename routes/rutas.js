const userRouter = require('./userRouter');
const zoneRouter = require('./zoneRouter');
const readingRouter = require('./readingRouter');
const sensorRouter = require('./sensorRouter');
const deviceRouter = require('./deviceRouter');

function routerApi(app) {
    app.use('/users', userRouter);
    app.use('/zones', zoneRouter);
    app.use('/readings', readingRouter);
    app.use('/sensors', sensorRouter);
    app.use('/devices', deviceRouter);
}

module.exports = routerApi;
const application = require('./App/App');
const settings = require('./defaultSettings/defaultSettings');

application.listen(settings.port, () => {
    console.log("Link Shortner is running.");
});
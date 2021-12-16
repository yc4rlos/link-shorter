import app from './App/App';
import defaultSetings from './defaultSettings/defaultSettings';

app.listen(defaultSetings.port, () => {
    console.log("Link Shorter is running.");
});
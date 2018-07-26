const express=require('express');
const app= express();

app.use(express.static(__dirname + '/dist/angular6Training'));

app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname+ '/dist/angular6Training/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

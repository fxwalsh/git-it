#!/usr/bin/env node

var prompt = require('prompt');
var fs = require('fs');
var nconf = require('nconf');

const Workshopper = require('workshopper-jlord'),
      path = require('path')


   
 nconf.argv()
   .env()
   .file({ file: 'config.json' });

//check for student id

var progress_post_options = nconf.get("progress_post_options");
console.log(progress_post_options);

if (!progress_post_options.studentID){
  var properties = [
    {
      name: 'studentID', 
      validator: /^[0-9]{8}$/,
      warning: 'studentID must be 8 numbers'
    }
  ];

  prompt.start();

  prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  StudentID: ' + result.studentID);
   // console.log('  Host: ' + result.progressPort);
    
    progress_post_options.studentID = result.studentID;
    
    process.env.LANG = 'C'
    nconf.set('progress_post_options:studentID', progress_post_options.studentID);
    nconf.save(function (err) {
         if (err) console.log('Unable to update config.json');
  });


Workshopper({
  name: 'git-it-wit',
  title: 'GIT + GITHUB : VERSION CONTROL + SOCIAL CODING',
  appDir: __dirname,
  helpFile: path.join(__dirname, 'help.txt'),
  menu: {
    fg: /^win/.test(process.platform) ? 'white' : 231,
    bg: /^win/.test(process.platform) ? 'blue'  : 33
  },
  studentID: progress_post_options.studentID,
  progressPostOptions: progress_post_options
}).init()
});

}else{

Workshopper({
  name: 'git-it-wit',
  title: 'GIT + GITHUB : VERSION CONTROL + SOCIAL CODING',
  appDir: __dirname,
  helpFile: path.join(__dirname, 'help.txt'),
  menu: {
    fg: /^win/.test(process.platform) ? 'white' : 231,
    bg: /^win/.test(process.platform) ? 'blue'  : 33
  },
  studentID: progress_post_options.studentID,
  progressPostOptions: progress_post_options
}).init()

}


function onErr(err) {
    console.log(err);
    return 1;
  }

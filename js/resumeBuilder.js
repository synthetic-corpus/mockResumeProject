/* This is the file that actually builds a resume site.
Various objects will be called on to fill out the Resume.
Each object has a comment explaining what it does. */

/*This is my first 'orginal' section. I have three buttons for three
different styles of display. Learned of this code via Stack Overflow. */

function changeStyle(sheet){
  document.getElementById("pagestyle").setAttribute("href",sheet)
  //Gets the HTML elements that controls the style.
  //Replaces the stylesheet with whatever the argument is.
  //Tested in Console and it works!!
};

document.getElementById("normal_style").onclick = function(){
  changeStyle("css/style.css");
  console.log("normal style");
  //Got this to work. When you click, it changes styles as expected.
};

document.getElementById("cyberpunk_style").onclick = function(){
  changeStyle("css/cyber.css");
  console.log("cyber style");
  //Got this to work. When you click, it changes styles as expected.
};

document.getElementById("hipster_style").onclick = function(){
  changeStyle("css/hipster.css");
  console.log("hipster style");
  //Got this to work. When you click, it changes styles as expected.
};



/*
----Map Section */

$("#mapDiv").append(googleMap);
$("#map").append(map);
//var whereLived = locationFinder();

/*Log Clicks Function and corresponding array*/
$(document).click(function(loc) {
  logClicks(loc.pageX,loc.pageY);
});

function inName(name){
  var first_last =name.split(" ");
  first_last[1] = first_last[1].toUpperCase();
  var reconstructedName = first_last[0] + " " + first_last[1];
  return reconstructedName;
};

/*
----Basic name and contact Section */
var bio = {
  "name":"Joel Gonzaga",
  "role":"Junior Software Developer",
  "contacts":{
    "mobile":"626-555-1084",
    "email":"Joel.gonzaga@notfake.com",
    "github":"synthetic corpus",
    "location":"Glendale, CA",
    "linkedin":"Joel Gonzaga"
  },
  "welcomeMessage":"Fortune Favors the Bold",
  "skills":["HTML/CSS","Git and Github","User Desktop Support","Management"],
  "biopic":"images/my_photo.jpg"
};

bio.display = function(){
  //Appends the correctly formatted name
  var formattedName = HTMLheaderName.replace('%data%',bio.name);
  var formattedMobile = HTMLmobile.replace('%data%',bio.contacts.mobile);
  var formattedEmail = HTMLemail.replace('%data%',bio.contacts.email);
  var formattedGithub = HTMLgithub.replace('%data%',bio.contacts.github);
  var formattedLinkedIn = HTMLcontactGeneric.replace('%data%',bio.contacts.linkedin).replace('%contact%','LinkedIn');
  var formattedCity = HTMLlocation.replace('%data%',bio.contacts.location);
  $("#header").append(formattedName);
  //Makes list of formatted contacts
  var toAppend = [
    formattedMobile,
    formattedEmail,
    formattedGithub,
    formattedCity,
    formattedLinkedIn,
  ];
  //Appends Aforementioned list to both top and bottom of the Resume.
  toAppend.forEach(function(entry){
    $("#topContacts").append(entry);
    $("#footerContacts").append(entry);
  });
  //Makes a avatar and appends it.
  var formattedAvatar = HTMLbioPic.replace("%data%",bio.biopic)
  $("#header").append(formattedAvatar);
  //Appends a list of Basic Skills
  $("#header").append(HTMLskillsStart);
  if (bio.skills.length > 0){
    var totalSkills = bio.skills.length;
    var count;
    var formattedSkill;
    for(count = 0; count < totalSkills; count++){
      formattedSkill = HTMLskills.replace("%data%",bio.skills[count]);
      $("#skills").append(formattedSkill);
    };
  };
};

bio.display();

/*
----Projects Section */

var projects = [
  {
    "title":"Ghosts of Skullsport",
    "dates":"November 2013",
    "description":"This was a novel written for Nanowrimo " +
    "(National Novel Writing Month) Simple logline of store is: " +
    "A young advernturing noble and former slave encounter ghosts of their last companions in Waterdeep.",
    "url":"http://nanowrimo.org/",
    "image":"",
    "iframe":""
  },
  {
    "title":"Way of Life",
    "dates":"March 2015",
    "description":"I arranged 'A Way of Life' from the 'the Last Samurai' on solo classical guitar.",
    "url":"https://www.youtube.com/watch?v=27SXt1g37nM",
    "image":"",
    "iframe":'<iframe width=auto height=auto src="https://www.youtube.com/embed/27SXt1g37nM?ecver=1" frameborder="0" allowfullscreen></iframe>'
  },
  {
    "title":"Korean Seafood: A Moral Dilemma",
    "dates":"December 2013",
    "description":"A blog contribution designed to help authors understand details of life in a foreign country.",
    "url":"http://noveltravelist.blogspot.com/2013/03/korea-eating-seafood-moral-dilemma.html#comment-form",
    "image":"http://3.bp.blogspot.com/-hVHNz68RgCM/UUdzZL_24QI/AAAAAAAAAY8/Db3XElCVeLo/s320/korean+frying+pan.jpg",
    "iframe":""
  }
];

projects.display = function(){
  projects.forEach(function(project){
    $("#projects_flex").append(HTMLprojectStart);
    //List initilize with all the things included in all project entries.
    var formattedTitle =HTMLprojectTitle.replace("%data%",project['title']).replace("#",project["url"]);
    var formattedDates = HTMLprojectDates.replace("%data%",project['dates']);
    var formattedDescription=HTMLprojectDescription.replace("%data%",project['description']);
    var toAppend = [
      formattedTitle,
      formattedDates,
      formattedDescription
    ];
    //Not all projects have Images and iFrames.
    //Appending to list only if data is found in respective areas.
    if (project.image.length){
      var formattedImage = HTMLprojectImage.replace("%data%",project['image']);
      toAppend.push(formattedImage);
    };
    if (project.iframe.length){
      //iframe Variable requires no extra formatted.
      //Is cut and pasted from the Youtube
      toAppend.push(project['iframe']);
    };
    toAppend.forEach(function(entry){
      $(".project-entry:last").append(entry);
    });
  });
};
projects.display();

/*
----Work Section and contact Section */

/*Orginally had a more complicated work section. Decided to keep the "simple" version */
var workSimple = {
  "jobs":[
  {
    "company":"UsaEpay",
    "location":"Glendale, CA",
    "dates":"July 2015 - Present Time",
    "position":"Corporate IT support",
    "description":"Responsible for desktop support in a Mac environment.",
    "url":"http://www.usaepay.com"
  },
  {
    "company":"DTT (Las Vegas Office)",
    "location":"Las Vegas, NV",
    "dates":"Aug 2013 - July 2015",
    "position":"Tech Support Supervisor",
    "description":"Assited clients and technicians in remote support of Windows 7 machines.",
    "url":"http://www.dttusa.com"
  },
  {
    "company":"DTT (Los Angeles Office)",
    "location":"Los Angeles, CA",
    "dates":"Feb 2012 - Aug 2013",
    "position":"Tech Support Supervisor",
    "description":"Assited clients and technicians in remote support of Windows 7 machines.",
    "url":"http://www.dttusa.com"
  },
  {
    "company":"Chungdahm Learning",
    "location":"Seoul, South Korea",
    "dates":"December 2010 - December 2011",
    "position":"Teacher of English",
    "description":"Taught English to Korean Students",
    "url":"http://www.teachinkorea.com/about/Introduction.aspx"
  }
]
};

workSimple.display = function(){
  workSimple.jobs.forEach(function(job){
    $("#workExperience").append(HTMLworkStart);
    var formattedCompany = HTMLworkEmployer.replace("%data%",job["company"]).replace("#",job["url"]);
    var formattedTitle = HTMLworkTitle.replace("%data%",job["position"]);
    var formattedCompanyTitle = formattedCompany + formattedTitle;
    var formattedDates = HTMLworkDates.replace("%data%",job["dates"]);
    var formattedDescription = HTMLworkDescription.replace("%data%",job["description"]);
    var toAppend = [
      formattedCompanyTitle,
      formattedDates,
      formattedDescription
    ];
    toAppend.forEach(function(part){
      $(".work-entry:last").append(part);
    });
  });
}
workSimple.display();

/*
----Education Section */
var education = {
  "schools":[
    {
      "name":"Azusa Pacific Univeristy",
      "location":"Azusa, CA",
      "degree":"BA",
      "majors":["philosophy"],
      "dates":"Graduated 2006",
      "url":"http://www.apu.edu",
      "logo":"images/apu_logo.png"
    },
    {
      "name":"Loyola Marymount University",
      "location":"Los Angeles, CA",
      "degree":"MA",
      "majors":["philosophy","Teaching Orientated Practium"],
      "dates":"Graduated 2010",
      "url":"http://www.lmu.edu",
      "logo":"images/lmu_logo.png"
    }
  ],
    "onlineCourses":[
    {
      "title":"Intro to Programming",
      "school":"Udacity",
      "dates":"Jan 2017 - Mar 2017",
      "school_url":"http://www.udacity.com",
      "course_url":"https://www.udacity.com/course/intro-to-programming-nanodegree--nd000",
      "logo":"images/udacity_logo.png"
    },
    {
      "title":"How to Use Git and GitHub",
      "school":"Udacity",
      "dates":"Dec 2016",
      "school_url":"http://www.udacity.com",
      "course_url":"https://www.udacity.com/course/how-to-use-git-and-github--ud775",
      "logo":"images/udacity_logo.png"
    },
    {
      "title":"Introduction to Computer Science",
      "school":"Udacity",
      "dates":"Sep 2016 - Oct 2016",
      "school_url":"http://www.udacity.com",
      "course_url":"https://www.udacity.com/course/intro-to-computer-science--cs101",
      "logo":"images/udacity_logo.png"
    }
  ]
};


// Education.display() to contain two functions to minmize length.
function displayUniversities(){
  $("#education").append(HTMLuniversityHeader);
  education.schools.forEach(function(university){
    //'formatted_Univeristy_link' requires additional variables.
    //will be composed of the two below.
    var formatted_school_name = HTMLschoolName.replace("#",university["url"]).replace('%data%',university["name"]);
    var formatted_degree = HTMLschoolDegree.replace("%data%",university["degree"]);
    var formatted_Univeristy_link = formatted_school_name + formatted_degree;
    //Rest of formatted requires only one replacement per entry. No concatinations.
    var formatted_school_year = HTMLschoolDates.replace("%data%",university["dates"]);
    var formatted_school_location = HTMLschoolLocation.replace("%data%",university["location"]);
    var formatted_major = HTMLschoolMajor.replace("%data%",university["majors"])//to Be refractored to a loop.
    var formatted_icon = HTMLschoolIcon.replace("%data%",university["logo"]);
    var toAppend = [
      formatted_Univeristy_link,
      formatted_school_year,
      formatted_school_location,
      formatted_major
    ];
    $("#education").append(HTMLschoolFlexer);
    $(".schoolFrame:last").append(formatted_icon);
    $(".schoolFrame:last").append(HTMLschoolStart);
    toAppend.forEach(function(entry){
      $(".education-entry:last").append(entry);
    });
  });
};

function displayOnlineCourses(){
  $("#education").append(HTMLonlineClasses);
  education.onlineCourses.forEach(function(techSchool){
    var formatted_online_course = HTMLonlineTitle.replace("#",techSchool["course_url"]).replace("%data%",techSchool["title"]);
    var formatted_online_school = HTMLonlineSchool.replace("%data%",techSchool["school"]);
    var formatted_online_link = formatted_online_course + formatted_online_school;
    var formatted_online_dates = HTMLonlineDates.replace("%data%",techSchool["dates"]);
    var formatted_course_link = HTMLonlineURL.replace("#",techSchool["school_url"]).replace("%data%",techSchool["school"]);
    var formatted_icon = HTMLschoolIcon.replace("%data%",techSchool["logo"]);
    var toAppend =[
      formatted_online_link,
      formatted_online_dates,
      formatted_course_link
    ];
    $("#education").append(HTMLschoolFlexer);
    $(".schoolFrame:last").append(formatted_icon);
    $(".schoolFrame:last").append(HTMLschoolStart);
    toAppend.forEach(function(entry){
      $(".education-entry:last").append(entry);
    });
  });
};

//This fuction display both the Education Functions.
education.display = function(){
  displayOnlineCourses();
  displayUniversities();
};

education.display();

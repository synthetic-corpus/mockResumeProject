/* This is the file that actually builds a resume site.
Various objects will be called on to fill out the Resume.
Each object has a comment explaining what it does. */
/*This is my first 'orginal' section. I have three buttons for three
different styles of display. Learned of this code via Stack Overflow. */
function changeStyle(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);
    //Gets the HTML elements that controls the style.
    //Replaces the stylesheet with whatever the argument is.
    //Tested in Console and it works!!
}

document.getElementById("normal_style").onclick = function() {
    changeStyle("css/style.css");
    console.log("normal style");
    //Got this to work. When you click, it changes styles as expected.
};

document.getElementById("cyberpunk_style").onclick = function() {
    changeStyle("css/cyber.css");
    console.log("cyber style");
    //Got this to work. When you click, it changes styles as expected.
};

document.getElementById("hipster_style").onclick = function() {
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
    logClicks(loc.pageX, loc.pageY);
});

/*
----Basic name and contact Section */
var bio = {
    "name": "Joel Gonzaga",
    "role": "Front End Developer",
    "contacts": {
        "mobile": "626-555-1084",
        "email": "Joel.gonzaga@notfake.com",
        "github": "synthetic corpus",
        "location": "Glendale, CA",
        "linkedin": "Joel Gonzaga"
    },
    "welcomeMessage": "Fortune Favors the Bold",
    "skills": ["HTML/CSS", "Git and Github", "User Desktop Support", "Management"],
    "biopic": "images/my_photo.jpg"
};

bio.display = function() {
    //Appends the correctly formatted name
    var formattedName = HTMLheaderName.replace('%data%', bio.name);
    var formattedMobile = HTMLmobile.replace('%data%', bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace('%data%', bio.contacts.email);
    var formattedGithub = HTMLgithub.replace('%data%', bio.contacts.github);
    var formattedLinkedIn = HTMLcontactGeneric.replace('%data%', bio.contacts.linkedin).replace('%contact%', 'LinkedIn');
    var formattedCity = HTMLlocation.replace('%data%', bio.contacts.location);
    var formattedWelcome = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);
    var formattedTitle = HTMLheaderRole.replace('%data%', bio.role);
    $("#header").append(formattedName, formattedTitle);
    //Makes list of formatted contacts
    var toAppend = [
        formattedMobile,
        formattedEmail,
        formattedGithub,
        formattedCity,
        formattedLinkedIn,
    ];
    //Appends Aforementioned list to both top and bottom of the Resume.
    toAppend.forEach(function(entry) {
        $("#topContacts, #footerContacts").append(entry);
    });
    //Makes a avatar and appends it.
    var formattedAvatar = HTMLbioPic.replace("%data%", bio.biopic);
    $("#header").append(formattedAvatar);
    //Appends a list of Basic Skills
    $("#header").append(formattedWelcome);
    $("#header").append(HTMLskillsStart);

    if (bio.skills.length > 0) {
        var totalSkills = bio.skills.length;
        var count;
        var formattedSkill;
        for (count = 0; count < totalSkills; count++) {
            formattedSkill = HTMLskills.replace("%data%", bio.skills[count]);
            $("#skills").append(formattedSkill);
        }
    }
};

/*
----Projects Section */

var projects = [{
        "title": "Ghosts of Skullsport",
        "dates": "November 2013",
        "description": "This was a novel written for Nanowrimo " +
            "(National Novel Writing Month) Simple logline of store is: " +
            "A young advernturing noble and former slave encounter ghosts of their last companions in Waterdeep.",
        "images": ["http://vignette3.wikia.nocookie.net/forgottenrealms/images/7/7e/Eilistraee_-_old_holy_symbol.jpg/revision/latest?cb=20150824084429"],
        "url": "http://nanowrimo.org/",
        "iframe": ""
    },
    {
        "title": "Way of Life",
        "dates": "March 2015",
        "description": "I arranged 'A Way of Life' from the 'the Last Samurai' on solo classical guitar.",
        "images": ["http://www.joblo.com/timthumb.php?src=/posters/images/full/2003-last_samurai-5.jpg&h=600&q=100"],
        "url": "https://www.youtube.com/watch?v=27SXt1g37nM",
        "iframe": '<iframe width=auto height=auto src="https://www.youtube.com/embed/27SXt1g37nM?ecver=1" frameborder="0" allowfullscreen></iframe>'
    },
    {
        "title": "Korean Seafood: A Moral Dilemma",
        "dates": "December 2013",
        "description": "A blog contribution designed to help authors understand details of life in a foreign country.",
        "images": ["http://3.bp.blogspot.com/-hVHNz68RgCM/UUdzZL_24QI/AAAAAAAAAY8/Db3XElCVeLo/s320/korean+frying+pan.jpg"],
        "url": "http://noveltravelist.blogspot.com/2013/03/korea-eating-seafood-moral-dilemma.html#comment-form",
        "iframe": ""
    }
];

projects.display = function() {
    projects.forEach(function(project) {
        $("#projects_flex").append(HTMLprojectStart);
        //List initilize with all the things included in all project entries.
        var formattedTitle = HTMLprojectTitle.replace("%data%", project.title).replace("#", project.url);
        var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
        var toAppend = [
            formattedTitle,
            formattedDates,
            formattedDescription
        ];
        //Not all projects have Images and iFrames.
        //Appending to list only if data is found in respective areas.
        if (project.iframe.length) {
            //iframe Variable requires no extra formatted.
            //Is cut and pasted from the Youtube
            toAppend.push(project.iframe);
        }
        if (project.images.length) {
            var formattedImage;
            project.images.forEach(function(image_url) {
                formattedImage = HTMLprojectImage.replace("%data%", image_url);
                toAppend.push(formattedImage);
            });

        }
        toAppend.forEach(function(entry) {
            $(".project-entry:last").append(entry);
        });
    });
};


/*
----Work Section and contact Section */

/*Orginally had a more complicated work section. Decided to keep the "simple" version
Renammed it back to 'work' */
var work = {
    "jobs": [{
            "employer": "UsaEpay",
            "title": "Corporate IT support",
            "location": "Glendale, CA",
            "dates": "July 2015 - Present Time",
            "description": "Responsible for desktop support in a Mac environment.",
            "url": "http://www.usaepay.com"
        },
        {
            "employer": "DTT (Las Vegas Office)",
            "title": "Tech Support Supervisor",
            "location": "Las Vegas, NV",
            "dates": "Aug 2013 - July 2015",
            "description": "Assited clients and technicians in remote support of Windows 7 machines.",
            "url": "http://www.dttusa.com"
        },
        {
            "employer": "DTT (Los Angeles Office)",
            "title": "Tech Support Supervisor",
            "location": "Los Angeles, CA",
            "dates": "Feb 2012 - Aug 2013",
            "description": "Assited clients and technicians in remote support of Windows 7 machines.",
            "url": "http://www.dttusa.com"
        },
        {
            "employer": "Chungdahm Learning",
            "title": "Teacher of English",
            "location": "Seoul, South Korea",
            "dates": "December 2010 - December 2011",
            "description": "Taught English to Korean Students",
            "url": "http://www.teachinkorea.com/about/Introduction.aspx"
        }
    ]
};

work.display = function() {
    work.jobs.forEach(function(job) {
        $("#workExperience").append(HTMLworkStart);
        var formattedCompany = HTMLworkEmployer.replace("%data%", job.employer).replace("#", job.url);
        var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
        var formattedCompanyTitle = formattedCompany + formattedTitle;
        var formattedDates = HTMLworkDates.replace("%data%", job.dates);
        var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
        var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
        var toAppend = [
            formattedCompanyTitle,
            formattedLocation,
            formattedDates,
            formattedDescription
        ];
        toAppend.forEach(function(part) {
            $(".work-entry:last").append(part);
        });
    });
};


/*
----Education Section */
var education = {
    "schools": [{
            "name": "Azusa Pacific Univeristy",
            "location": "Azusa, CA",
            "degree": "BA",
            "majors": ["philosophy"],
            "dates": "Sept 2002 - 2006",
            "url": "http://www.apu.edu",
            "logo": "images/apu_logo.png"
        },
        {
            "name": "Loyola Marymount University",
            "location": "Los Angeles, CA",
            "degree": "MA",
            "majors": ["philosophy", "Teaching Orientated Practium"],
            "dates": "Sept 2008 - 2010",
            "url": "http://www.lmu.edu",
            "logo": "images/lmu_logo.png"
        }
    ],
    "onlineCourses": [{
            "title": "Intro to Programming",
            "school": "Udacity",
            "dates": "Jan 2017 - Mar 2017",
            "url": "http://www.udacity.com",
            "course_url": "https://www.udacity.com/course/intro-to-programming-nanodegree--nd000",
            "logo": "images/udacity_logo.png"
        },
        {
            "title": "How to Use Git and GitHub",
            "school": "Udacity",
            "dates": "Dec 2016",
            "url": "http://www.udacity.com",
            "course_url": "https://www.udacity.com/course/how-to-use-git-and-github--ud775",
            "logo": "images/udacity_logo.png"
        },
        {
            "title": "Introduction to Computer Science",
            "school": "Udacity",
            "dates": "Sep 2016 - Oct 2016",
            "url": "http://www.udacity.com",
            "course_url": "https://www.udacity.com/course/intro-to-computer-science--cs101",
            "logo": "images/udacity_logo.png"
        }
    ]
};


// Education.display() to contain two functions to minmize length.
function displayUniversities() {
    $("#education").append(HTMLuniversityHeader);
    education.schools.forEach(function(university) {
        //'formatted_Univeristy_link' requires additional variables.
        //will be composed of the two below.
        var formatted_school_name = HTMLschoolName.replace("#", university.url).replace('%data%', university.name);
        var formatted_degree = HTMLschoolDegree.replace("%data%", university.degree);
        var formatted_Univeristy_link = formatted_school_name + formatted_degree;
        //Rest of formatted requires only one replacement per entry. No concatinations.
        var formatted_school_year = HTMLschoolDates.replace("%data%", university.dates);
        var formatted_school_location = HTMLschoolLocation.replace("%data%", university.location);
        var formatted_major = HTMLschoolMajor.replace("%data%", university.majors);
        var formatted_icon = HTMLschoolIcon.replace("%data%", university.logo);
        var toAppend = [
            formatted_Univeristy_link,
            formatted_school_year,
            formatted_school_location,
            formatted_major
        ];
        $("#education").append(HTMLschoolFlexer);
        $(".school-frame:last").append(formatted_icon);
        $(".school-frame:last").append(HTMLschoolStart);
        toAppend.forEach(function(entry) {
            $(".education-entry:last").append(entry);
        });
    });
}

function displayOnlineCourses() {
    $("#education").append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(techSchool) {
        var formatted_online_course = HTMLonlineTitle.replace("#", techSchool.course_url).replace("%data%", techSchool.title);
        var formatted_online_school = HTMLonlineSchool.replace("%data%", techSchool.school);
        var formatted_online_link = formatted_online_course + formatted_online_school;
        var formatted_online_dates = HTMLonlineDates.replace("%data%", techSchool.dates);
        var formatted_course_link = HTMLonlineURL.replace("#", techSchool.url).replace("%data%", techSchool.school);
        var formatted_icon = HTMLschoolIcon.replace("%data%", techSchool.logo);
        var toAppend = [
            formatted_online_link,
            formatted_online_dates,
            formatted_course_link
        ];
        /* The extra 'SchoolFrame' element is needed to make the
        school crests display correctly */
        $("#education").append(HTMLschoolFlexer);
        $(".school-frame:last").append(formatted_icon);
        $(".school-frame:last").append(HTMLschoolStart);
        toAppend.forEach(function(entry) {
            $(".education-entry:last").append(entry);
        });
    });
}

//This fuction display both the Education Functions.
education.display = function() {
    displayOnlineCourses();
    displayUniversities();
};

bio.display();
projects.display();
work.display();
education.display();

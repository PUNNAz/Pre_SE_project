// importing the dependencies
// defining the Express app
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
let alert = require('alert');

// defining the Express app
const app = express();

//setting middleware
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/Images'));
app.use(express.static('src'));

// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit: 100000000000 }));
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

//setting database
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'sql6.freemysqlhosting.net',
	user: 'sql6580640',
	password: 'eyM9AFsXGi',
	database: 'sql6580640'
});
connection.connect(function (err) {
	if (err) throw err;
});

//variable
let username;
let type ;
let userType;

//API
app.post('/login', function (request, response) {
	var alert = require('alert');
	// Capture the input fields
	username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
            userType = results[0].type;
            //console.log(userType);
			if (results.length > 0) {
				if (results[0].type == 0) response.redirect('/MainPageStudent.html');
				else response.redirect('/MainPageTeacher.html');
			} else {
				alert('Incorrect Username and/or Password!');
				response.redirect('/login.html');
			}
			response.end();
		});
	} else {
		alert('Please enter username and password');
		response.redirect('/login.html');
		response.end();
	}
});

app.get('/data',function (req, res){
    userType = userType + 1
	connection.query('SELECT username,type,status,teacherName,officerReason,teacherReason,deanReason FROM Form WHERE status = ?', [userType], function (err, result, fields) {
		console.log(result)
		if (err) throw err;
			username = result[0].username
			type = result[0].type

		console.log(result)
		res.send(result);
	});
 });

app.get('/data2', function (req, res) {
	connection.query('SELECT * FROM StudentData WHERE username = ? ', [username], function (err, result) {
		if (err) throw err;
		res.send(result);
	});
});
app.get('/data3', function (req, res) {
	if (type == 0) {
		connection.query('SELECT * FROM AddData WHERE username = ? ', [username], function (err, result) {
			if (err) throw err;
			res.send(result);
		});
	} else if (type == 1) {
		connection.query('SELECT * FROM DropData WHERE username = ? ', [username], function (err, result) {
			if (err) throw err;
			res.send(result);
		});
	}else if (type == 2) {
		connection.query('SELECT * FROM QuitReason WHERE username = ? ', [username], function (err, result) {
			if (err) throw err;
			res.send(result);
		});
	}
})


app.get('/SDstatus', function (req, res) {
	connection.query('SELECT username,type,status FROM Form WHERE username = ?', [username], function (err, result, fields) {
		// let sql = 'SELECT id_form,username,type,status,teacherName,officerReason,teacherReason,deanReason FROM Form'
		//let sql = 'SELECT username,type,status FROM Form'
		//connection.query(sql, function (err, result, fields) {
		console.log(result)
		if (err) throw err;
		console.log(result)
		res.send(result);
	});
});
app.post('/checkdata', function (req, res){
	console.log(type) ;
	if (type == 0) {
		res.redirect('/Showadd.html')
	} else if (type == 1) {
		res.redirect('/Showdrop.html')
	}else if (type == 2) {
		res.redirect('/Showquitreason.html')
	}
})

//API
app.post('/testnew', (req, res) => {
	//res.send('hi')
	var re=req.body.reason
	var a
    //console.log(a);
    //console.log(username);
    connection.query('SELECT * FROM Form WHERE username = ?', [username], 
    	function(err,result){
        if(err){
            res.send('error')
        } 
        a = result[0].status

        if (a==2){
    	connection.query("UPDATE Form SET deanReason = (?) WHERE username = (?)",[re,username],
  	function(err,result){
        if(err){
            res.send('error')
        	} 
    	})
        a=3
    	connection.query("UPDATE Form SET status = (?) WHERE username = (?)",[a,username],
    		function(err,result){
        if(err){
            res.send('error')
        } 
    	})
	}

	if (a==1){
    	connection.query("UPDATE Form SET teacherReason = (?) WHERE username = (?)",[re,username],
  	function(err,result){
        if(err){
            res.send('error')
        	} 
    	})
    	a=2
    	connection.query("UPDATE Form SET status = (?) WHERE username = (?)",[a,username],
    		function(err,result){
        if(err){
            res.send('error')
        } 
    	})
	}
        
        if(a==0){
    	connection.query("UPDATE Form SET officerReason = (?) WHERE username = (?)",[re,username],
  	function(err,result){
        if(err){
            res.send('error')
        } 

    	})
    	a=1
    	connection.query("UPDATE Form SET status = (?) WHERE username = (?)",[a,username],
    		function(err,result){
        if(err){
            res.send('error')
        }
    	})
        
    }
    
    res.redirect('MainPageTeacher.html')
    })
});

//StudentData database
app.post('/keepdata', function (req, res) {
	//res.send('hi')
    //var kdate=req.body[today]
    var bname=req.body.namet
    var namef=req.body.fname
    var namel=req.body.lname
    var idstd=req.body.stdID
        userid=req.body.stdID
    var kgrade=req.body.Grade
    var kmajor=req.body.major
    var kadvisor=req.body.advisor
    var knum=req.body.num
    var kmoo=req.body.moo
    var ktambon=req.body.Tambon
    var kamphoe=req.body.Amphoe
    var kProvince=req.body.Province
    var kPostalCode=req.body.PostalCode
    var knumPhone=req.body.numPhone
    var knumHouse=req.body.numHouse
    var kpetition=req.body.petition
    var ktype
    var kstatus = 0
    if(kpetition=="add"){
        ktype = 0;
    }else if(kpetition=="drop"){
        ktype = 1;
    }else {
        ktype = 2;
    }
    
    connection.query('INSERT INTO Form(username,type,teacherName,status) VALUES(?,?,?,?)',[userid,ktype,kadvisor,kstatus])
    
    console.log(namef);
    connection.query('INSERT INTO StudentData(username,prefix,name,surname,studentID,year,major,teacherName,houseNo,moo,tambon,amphoe,changwat,postalCode,phone,homePhone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[userid,bname,namef,namel,idstd,kgrade,kmajor,kadvisor,knum,kmoo,ktambon,kamphoe,kProvince,kPostalCode,knumPhone,knumHouse],
    function(err,result){
        if(err){
            res.send('error')
        } 
        //res.send('true')
        if(kpetition=="add"){
        res.redirect('ตารางเพิ่ม.html')
        } else if(kpetition=="drop"){
        res.redirect('ตารางถอน.html')
        } else{
            res.redirect('Quit.html')
        }
    })
});


app.post('/AddDropData',function (req, res) {
    //res.send('hi')
    var kid=req.body.ID
    var ksub=req.body.subject
    var ksec=req.body.section
    var ksubdate=req.body.subjectDate
    var kcre=req.body.credit
    var kteacher=req.body.teacherName
    var kre=req.body.reason
    //var kallow=req.body.teacherAccept
    console.log(userid)
    console.log(kid)
    console.log(ksub)
    console.log(ksec)
    console.log(ksubdate)
    console.log(kcre)
    console.log(kteacher)
    console.log(kre)
    
    
    connection.query('INSERT INTO AddData(username,subjectCode,subject,section,credit,time,instructor,reason) VALUES(?,?,?,?,?,?,?,?)',[userid,kid,ksub,ksec,kcre,ksubdate,kteacher,kre],
    function(err,result){
        if(err){
            res.send('error')
        }
        res.redirect('MainPageStudent.html')
    })
});

app.post('/DropData',function (req, res) {
    //res.send('hi')
    var kid=req.body.ID
    var ksub=req.body.subject
    var ksec=req.body.section
    var ksubdate=req.body.subjectDate
    var kcre=req.body.credit
    var kteacher=req.body.teacherName
    var kre=req.body.reason
    //var kallow=req.body.teacherAccept
    console.log(kid)
    connection.query('INSERT INTO DropData(username,subjectCode,subject,section,credit,time,instructor,reason) VALUES(?,?,?,?,?,?,?,?)',[userid,kid,ksub,ksec,kcre,ksubdate,kteacher,kre],
    function(err,result){
        if(err){
            res.send('error')
        }
        res.redirect('MainPageStudent.html')
    })
});


//Quit reason database
app.post('/QuitData', function (req, res) {
    //res.send('hi')
    var kreason=req.body.reason
    console.log(kreason);
    connection.query('INSERT INTO QuitReason(username,reason) VALUES(?,?)',[userid,kreason],
    function(err,result){
        if(err){
            res.send('error')
        }
        res.redirect('MainPageStudent.html')
    })
});




// starting the server
app.listen(3001, () => {
	console.log('listening on port 3001');
});


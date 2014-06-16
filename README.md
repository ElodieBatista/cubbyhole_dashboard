cubbyhole_dashboard
===================

# Getting started

Git bash on the "app" folder

	node web-server.js

Launch browser at 
	
	http://localhost:8002/index.html

Credentials:

	cubbyholeadm@gmail.com
	Supinf0cubbyhole

# Changing IP Addresses

Go to /src/app.js & replace lines 10, 11 and 12

	.constant('conf', {
    		'epApi': 'http://localhost:3000',
		'epDbdApi': 'http://localhost:3001',
    		'epWeb': 'http://localhost:8000'
  	})
  	
with

	.constant('conf', {
	        'epApi': '10.0.0.25:3000',
		'epDbdApi': '10.0.0.25:3001',
	        'epWeb': '10.0.0.20:8000'
	})

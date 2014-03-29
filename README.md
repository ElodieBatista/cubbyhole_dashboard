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

Go to /src/app.js & replace lines 10 and 11

	.constant('conf', {
    		'epApi': 'http://localhost:3000',
    		'epWeb': 'http://localhost:8000'
  	})
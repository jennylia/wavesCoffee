$(function(){

	//DOM Cache
	$orderList = $('#order');
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/johnbob/friends',
		success: function(data){
			$.each(data, displayData);
		},
		error: function(data){
			console.log("fail" + data);
		}
	});

	var displayData = function(i, order){
		var orderName = order.name;
		if (orderName){
			$orderList.append("<li class=\"list-group-item\">" + order.name + "</li>");}
		}

	});
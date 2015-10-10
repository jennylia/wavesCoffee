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
		var orderDrink = order.drink;
		if (orderName && orderDrink){
			$orderList.append("<li class=\"list-group-item\"><b>" + orderName + "</b>, "+ orderDrink + "</li>");
		}

	}

	$orderName = $('#name').val();
	$orderDrink = $('#order').val();
	//for submitting an order
	var neworder = {
		
	};

});
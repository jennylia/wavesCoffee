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

	$orderName = $('#name');
	$orderDrink = $('#drink')
	//for submitting an order
	

	$('#submitOrder').on('click', function(){
		var neworder = {
			name: $orderName.val(),
			drink: $orderDrink.val()
		};

		$.ajax({
			type:'POST',
			url: 'http://rest.learncode.academy/api/johnbob/friends',
			data: neworder,
			success: function(data){
				console.log(data);
				displayData(0,data);
			},
			error: function(data){
				console.log("fail" + data);
			}
		});
	});

});
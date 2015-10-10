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

	var orderTemp = "<li class=\"list-group-item\">"+
	"<b>{{name}}, </b>{{drink}}"+
	"<button class='btn remove' data-id='{{id}}'>X</button>"+
	"</li>";

	var displayData = function(i, order){
		var orderName = order.name;
		var orderDrink = order.drink;
		if (orderName && orderDrink){
			$orderList.append(Mustache.render(orderTemp, order));
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

	$orderList.delegate("button", "click", function(){

		console.log("hey");
		var id = $(this).attr('data-id');
		console.log(id);

		$li = $(this).closest('li');
		$.ajax({
			type:'DELETE',
			url: 'http://rest.learncode.academy/api/johnbob/friends/' + id,
			success: function(data){
				console.log("sucess");
				var me = $(this);

				console.log(me);
				$li.fadeOut(300, function(){
					$(this).remove();
				});


			},
			error: function(data){
				console.log("fail");
				var me = $(this);

				console.log(me);
			}
		});

	});


});
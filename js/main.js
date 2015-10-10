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

	var orderTemp = $('#orderTemplate').html();

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

	$orderList.delegate("button.btn.remove", "click", function(){

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

	//This is for editting
	$orderList.delegate("button.btn.editOrder", "click", function(){
		$li = $(this).closest('li');
		$li.addClass('edit');
		$li.find('.edit.name').val($li.find('.noedit.name').html());
		$li.find('.edit.drink').val($li.find('.noedit.drink').html());
		console.log("edit has been clicked");

		
	});

	$orderList.delegate("button.btn.cancelEdit", "click", function(){
		$li = $(this).closest('li');
		$li.removeClass('edit');
		console.log("cancel has been clicked");
	});


	$orderList.delegate("button.btn.saveOrder", "click", function(){
		$li = $(this).closest('li');
		console.log("save has been clicked");

		var updateOrder = {
			name: $li.find('.edit.name').val(),
			drink: $li.find('.edit.drink').val()
		};

		console.log(updateOrder.name);
		console.log(updateOrder.drink);
		var id = $li.attr('data-id');

		$.ajax({
			type:'PUT',
			url: 'http://rest.learncode.academy/api/johnbob/friends/' + id,
			data: updateOrder,
			success: function(data){
				console.log("successfully updated status:" + data);
				console.log(updateOrder.name);
				console.log(updateOrder.drink);

				$li.find('.noedit.name').html(updateOrder.name);
			},
			error: function(data){
				console.log("Fail" + data);
			}
		});
		$li.removeClass('edit');


	});




});
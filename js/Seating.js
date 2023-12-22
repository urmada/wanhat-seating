var firstSeatLabel = 1;
		
			$(document).ready(function() {

        //Retrieve backend data
        const sd = getSeatMap()
        const seatsclass = getSeatClass()
        const AvailableSeat = getSeatStatus()

				var $cart = $('#selected-seats'),
					$counter = $('#counter'),
					$total = $('#total'),
					sc = $('#seat-map').seatCharts({
					map: sd,
					seats: seatsclass,
					naming : {
						top : false,
						getLabel : function (character, row, column) {
							return firstSeatLabel++;
						},
					},
					legend : {
						node : $('#legend'),
					    items : [
							[ 'f', 'available',   'VIP Ticket' ],
							[ 'e', 'available',   'Regular Ticket'],
							[ 'f', 'unavailable', 'Already Booked']
					    ]					
					},
					click: function () {
						if (this.status() == 'available') {
							//let's create a new <li> which we'll add to the cart items
							$('<li>'+this.data().category+' Seat # '+this.settings.label+': <b>$'+this.data().price+'</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
								.attr('id', 'cart-item-'+this.settings.id)
								.data('seatId', this.settings.id)
								.appendTo($cart);
							
							/*
							 * Lets update the counter and total
							 *
							 * .find function will not find the current seat, because it will change its stauts only after return
							 * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
							 */
							$counter.text(sc.find('selected').length+1);
							$total.text(recalculateTotal(sc)+this.data().price);
							
							return 'selected';
						} else if (this.status() == 'selected') {
							//update the counter
							$counter.text(sc.find('selected').length-1);
							//and total
							$total.text(recalculateTotal(sc)-this.data().price);
						
							//remove the item from our cart
							$('#cart-item-'+this.settings.id).remove();
						
							//seat has been vacated
							return 'available';
						} else if (this.status() == 'unavailable') {
							//seat has been already booked
							return 'unavailable';
						} else {
							return this.style();
						}
					}
				});

				//this will handle "[cancel]" link clicks
				$('#selected-seats').on('click', '.cancel-cart-item', function () {
					//let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
					sc.get($(this).parents('li:first').data('seatId')).click();
				});

				//let's pretend some seats have already been booked
				sc.get(AvailableSeat).status('unavailable');
		
		});

		function recalculateTotal(sc) {
			var total = 0;
		
			//basically find every selected seat and sum its price
			sc.find('selected').each(function () {
				total += this.data().price;
			});
			
			return total;
		}

    function getSeatMap() {
      const sm =
          [
              '_______ffffffffffff_ffffffffffff______',
              '_____ffffffffffff_____ffffffffffff____', 
              '____fffffff_________________fffffff___',
              '__fffffff_____________________fffffff_',
              '_ffffff_________________________ffffff',
              '_ffffff_________________________ffffff',
              '_',
              '___eee___________________________eee___',
              '__eee_____________________________eee__',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              'eee_________________________________eee',
              '__eee_____________________________eee__',
              '____eee_________________________eee____',
          ]
      return sm
  }
  
  function getSeatClass(){
      const sc = 
      {
          f: {
              price   : 12,
              classes : 'VIP-Ticket', 
              category: 'VIP Ticket'
          },
          e: {
              price   : 10,
              classes : 'Regular-Ticket', 
              category: 'Regular Ticket'
          }					
      
      }
  
      return sc
  }
  
  function getSeatStatus(){
      const as = 
      ['2_1','2_28','2_29','2_30','2_31']
  
      return as
  }
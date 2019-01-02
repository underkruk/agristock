;(function(){

    function SeatReservation(seat, name, initialMeal){
        var self = this;
        self.seat = seat;
        self.name = name;
        self.meal = ko.observable(initialMeal);
    }


    function ReservationsViewModel(){

        var self = this;

        self.species = ko.observableArray();

        self.availableMeals = [
            { mealName: "Standard (sandwich)", price: 20 },
            { mealName: "Premium (lobster)", price: 34.95 },
            { mealName: "Ultimate (whole zebra)", price: 290 },
            { mealName: "Salat", price: 90 },
            { mealName: "Olive", price: 190 }
        ];

        self.allSeats = [1,2,3,4,5,6,7,8,10];

        self.clients = ['Anton', 'Valera', 'Vova'];

        self.seats = ko.observableArray([
            new SeatReservation(1, "Steve", self.availableMeals[0]),
            new SeatReservation(2, "Bert", self.availableMeals[2])
        ]);

        self.totalSurcharge = ko.computed(function(){
            var total = 0;
            for(var i=0; i < self.seats().length; i++) {
                total += self.seats()[i].meal().price;
            }
            return total;
        });

        self.availableSeats = ko.computed(function(){
            var seats = self.allSeats;
            if(self.seats().length === 0) return seats;
            self.seats().forEach(function(el){
                seats = seats.filter(function(el2){
                    return el2 !== el.seat;
                })
            });
            return seats;
        });

        self.addSeat = function(){
            var randomMenu = getRandomValue(self.availableMeals.length),
                randomClient = getRandomValue(self.clients.length),
                randomSeat = getRandomValue( self.availableSeats().length);
            self.seats.push(new SeatReservation(self.availableSeats()[randomSeat],self.clients[randomClient], self.availableMeals[randomMenu]));
        };

        self.addSelectSeat =  function(data){
            var randomMenu = getRandomValue(self.availableMeals.length),
                randomClient = getRandomValue(self.clients.length),
                randomSeat = self.availableSeats().findIndex(function(el){
                    return el === data;
                });
            if(randomSeat > -1){
                self.seats.push(new SeatReservation(self.availableSeats()[randomSeat],self.clients[randomClient], self.availableMeals[randomMenu]));
            }
        };

        self.removeSeat = function(seat){
            self.seats.remove(seat);
        };
    }
    function getRandomValue(max){
        return Math.floor(Math.random() * Math.floor(max));
    }
    ko.applyBindings(new ReservationsViewModel());
})();
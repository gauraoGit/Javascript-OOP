/*Encapsulation and Data Hiding using Javascript IIFE Using ES6 Class Syntaxt  */

var TheaterSeats = (function(){
    var priv = new WeakMap();

    var _ = function(instance){
        return priv.get(instance);
    }
    /*ES 6 Syntax*/
    class TheaterSeatsConstructor{
       /*initilise   members inside constructor*/
        constructor(n){
            var privateMembers = { seats: [] };
            this.maxSeats = n;
            priv.set(this, privateMembers);
        }
        placePerson(person) {
            _(this).seats.push(person);
        }
        countFreeSeats() {
            return this.maxSeats - _(this).seats.length;
        }
        countOccupiedSeats() {
            return _(this).seats.length;
        }
        isSoldOut() {
            return _(this).seats.length >= this.maxSeats;
        }
    }
    return TheaterSeatsConstructor;
})();


describe('TheaterSeats Initialization ', function() {
    var theater = new TheaterSeats(20);
    it('After Initilization theater should not be null', function () {
        expect(theater).not.toBe(null);
    });
    it('Initilized with 20 seats should show 20 as maxSeats', function() {
        expect(theater.maxSeats).not.toEqual(10); 
        expect(theater.maxSeats).toEqual(20); 
    });
    it('Initilized theater 2 with 10 seats should not be equal to theater with 20 seats', function () {
        var theater2 = new TheaterSeats(10);
        expect(theater2.maxSeats).not.toEqual(theater.maxSeats);
        expect(theater2.maxSeats).toEqual(10);
    });
        
    it('Initialy occupied theater seats should be equal to 0', function () {
       expect(theater.countOccupiedSeats()).toEqual(0);
    });
    
    it('Initaily total free seats should be equal to maxseats availabel in theater', function() {
        expect(theater.maxSeats).toEqual(theater.countFreeSeats());
    });

    it('Initialy ticket sold out should return false', function () {
        expect(theater.isSoldOut()).toBe(false);
    });
    
    it('Allocate seat to the person then available seats will be equal maxSeats - countOccupied Seats', function() {
        theater.placePerson({name: 'Sunil'});
        expect(theater.countFreeSeats()).toEqual(theater.maxSeats -theater.countOccupiedSeats());


    });
        
        
});
    
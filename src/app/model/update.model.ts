export class UpdateModel {
    userId: number
    name: String
    addressLine1: String
    addressLine2: String
    city: String
    state: String
    country: String
    zipcode: number


    constructor(userId, name, addressLine1,addressLine2,city,state,country,zipcode){
        this.userId = userId;
        this.name = name;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipcode = zipcode;
    }
}
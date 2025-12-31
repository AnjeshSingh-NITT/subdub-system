import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true,
        minLength: 3,
        maxLength:50
    },
    price:{
        type:Number,
        required:[true,'Price is required'],   
        min: [0, 'Price cannot be negative']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'], // Add more currencies as needed
        required: [true, 'Currency is required']
    },
    frequency: {
        type: String,
        enum: ['daily','weekly' , 'monthly', 'yearly'],
        required: [true, 'Frequency is required']
    },
    category: {
        type: String,
        enum: ['entertainment', 'education', 'productivity', 'health', 'technology', 'finance', 'other'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'canceled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required : [true, 'Start date is required'],
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Start date cannot be in the future'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'End date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
        index: true,
    }

},{timestamps:true});

//autocalculate renewal date and status before saving

subscriptionSchema.pre('save', function () {
    if (!this.renewalDate) {
        const periods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        const renewalDate = new Date(this.startDate);
        renewalDate.setDate(renewalDate.getDate() + periods[this.frequency]);
        this.renewalDate = renewalDate;
    }

    this.status = this.renewalDate > new Date() ? 'active' : 'expired';
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
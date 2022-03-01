const Auth = require('../Model/Auth');
const Parking = require('../Model/Parking');
const Validator = require('../Utilities/validator');
const { otpGenerator } = require("../Utilities/helpers");
const Merchant = require('../Model/Merchant');
const keys = require("../Config/config");

exports.inValid = async (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Invalid Path'
    })
}

exports.addParking = async (req, res) => {
    try {
        const { parkingName, price, address, name, phoneNumber, about } = req.body;
        const { parkingImage } = req.files;
        const check_exist = await Auth.findById(req.data.id);
        if (!check_exist) return res.status(404).json({ error: 'User not found' })

        let new_parking = new Parking({
            merchantId: req.data.id,
            parkingName,
            price,
            address,
            contactInfo: {
                name,
                phoneNumber
            },
            about,
            parkingImage: keys.apiURL + parkingImage[0].filename || keys.apiURL + "default.png"
        });
        const save = await new_parking.save();
        return res.status(200).json({
            success: true,
            msg: "Parking hasbeen added successfully",
            data: { parkingDetails: save },
        });
    }
    catch (error) {
        return error.message;
    }
}

exports.updateParking = async (req, res) => {
    try {
        const { parkingId, parkingName, price, address, name, phoneNumber, about } = req.body;
         const { parkingImage } = req.files;
        const check_exist = await Auth.findById(req.data.id);
        if (!check_exist) return res.status(404).json({ error: 'User not found' })

        const updateData = await Parking.updateOne(
            { _id: parkingId },
            {
                $set: {
                    parkingName, price, address,contactInfo: {name, phoneNumber}, name, phoneNumber, about,
                    parkingImage: parkingImage && keys.apiURL + parkingImage[0].filename
                }
            })
        return res.status(200).json({
            success: true,
            msg: "Parking hasbeen added successfully",
        });
    }
    catch (error) {
        return error.message;
    }
}

// exports.updateAbout = async (req, res) => {
//     try {
//         const { about, parkingId } = req.body;
//         const check_exist = await User.findOne(req.data.id);
//         if (!check_exist) return res.status(404).json({ error: 'User not found' })
//         const parking = await Parking.updateOne({ _id: parkingId }, { about });
//         return res.status(200).json({
//             success: true,
//             msg: "Udated successfully",
//             data: { walker: save },
//         });
//     }
//     catch (error) {
//         return error.message;
//     }
// }
// exports.updateParkingAddress = async (req, res) => {
//     try {
//         const { parkingName, address, parkingId } = req.body;
//         const check_exist = await User.findOne(req.data.id);
//         if (!check_exist) return res.status(404).json({ error: 'User not found' })
//         await Parking.updateOne({ _id: parkingId }, { parkingName, address });
//         return res.status(200).json({
//             success: true,
//             msg: "Udated successfully",
//         });
//     }
//     catch (error) {
//         return error.message;
//     }
// }
// exports.updateParkingImage = async (req, res) => {
//     try {
//         const { parkingImage, parkingId } = req.files;
//         const check_exist = await User.findOne(req.data.id);
//         if (!check_exist) return res.status(404).json({ error: 'User not found' })
//         await Parking.updateOne({ _id: parkingId }, {
//             parkingImage: keys.apiURL + parkingImage[0].filename || keys.apiURL + "default.png"
//         }
//         );
//         return res.status(200).json({
//             success: true,
//             msg: "Udated successfully",
//         });
//     }
//     catch (error) {
//         return error.message;
//     }
// }
// exports.updateParkingPrice = async (req, res) => {
//     try {
//         const { price, parkingId } = req.files;
//         const check_exist = await User.findOne(req.data.id);
//         if (!check_exist) return res.status(404).json({ error: 'User not found' })
//         const parking = await Parking.updateOne({ _id: parkingId }, {
//             price
//         }
//         );
//         return res.status(200).json({
//             success: true,
//             msg: "Udated successfully",
//         });
//     }
//     catch (error) {
//         return error.message;
//     }
// }
// exports.updateParkingContactInfo = async (req, res) => {
//     try {
//         const { name, phoneNumber, parkingId } = req.files;
//         const check_exist = await User.findOne(req.data.id);
//         if (!check_exist) return res.status(404).json({ error: 'User not found' })
//         const parking = await Parking.updateOne({ _id: parkingId }, {
//             'contactInfo.name': name, 'contactInfo.phoneNumber': phoneNumber
//         }
//         );
//         return res.status(200).json({
//             success: true,
//             msg: "Udated successfully",
//         });
//     }
//     catch (error) {
//         return error.message;
//     }
// }

exports.addParkingZone = async (req, res) => {
    try {
        const { parkingId, zoneName } = req.body;
        const check_exist = await User.findOne(req.data.id);
        if (!check_exist) return res.status(404).json({ error: 'User not found' })
        const getZone = await Parking.findOne({ _id: parkingId, 'parkingZone.zoneName': zoneName },)
        const newSpot = getZone.zoneNumber.length;
        console.log("newSpot", newSpot)
        const addZone = await Parking.updateOne({ _id: parkingId, 'parkingZone.zoneName': zoneName },
            { $push: { 'parkingZone.$.zoneName.$.zoneNumber': newSpot } }
        );

        return res.status(200).json({
            success: true,
            msg: "Your Profile hasbeen updated successfully",
            data: { walker: save },
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.addParkingZone = async (req, res) => {
    try {
        const { parkingId, zoneName } = req.body;
        const check_exist = await Auth.findOne({ _id: req.data.id });
        if (!check_exist) return res.status(404).json({ error: 'User not found' })
        const zone = { zoneName }
        const updateZone = await Parking.updateOne({ _id: parkingId, },
            { $push: { 'parkingZone': zone } }
        );
        // const getZone = await Parking.findOne({ _id: parkingId, 'parkingZone.zoneName': zoneName },)
        // const newSpot = getZone.zoneNumber.length;
        // console.log("newSpot", newSpot)
        // const addZone = await Parking.updateOne({ _id: parkingId, 'parkingZone.zoneName': zoneName },
        //     { $push: { 'parkingZone.$.zoneName.$.zoneNumber': isFree } }
        // );

        return res.status(200).json({
            success: true,

        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.updateParkingZone = async (req, res) => {
    try {
        const { parkingId, zoneId, isAvailable } = req.body;
        const check_exist = await Auth.findOne({ _id: req.data.id });
        if (!check_exist) return res.status(404).json({ error: 'User not found' })
        // const updateZone = await Parking.updateOne({ _id: parkingId, 'parkingZone._id': zoneId },
        //     { $set: { 'parkingZone.$.zoneInfo.$.isAvailable': isAvailable } }
        // );
        const getZone = await Parking.findOne({ _id: parkingId, 'parkingZone._id': zoneId },)
        console.log("getZone", getZone.parkingZone[0].zoneInfo.length)
        const newSpot = getZone.parkingZone[0].zoneInfo.length + 1;
        console.log("newSpot", newSpot)
        const newZone = { zoneNumber: newSpot, isAvailable }
        const addZone = await Parking.updateOne({ _id: parkingId, 'parkingZone._id': zoneId },
            { $push: { 'parkingZone.$.zoneInfo': newZone } }
        );

        return res.status(200).json({
            success: true,
            msg: "Zone hasbeen updated successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateParkingAvailability = async (req, res) => {
    try {
        const { parkingId, startTime, endTime, date } = req.body;
        const check_exist = await Auth.findOne({ _id: req.data.id });
        if (!check_exist) return res.status(404).json({ error: 'User not found' })
        // const updateAV = await Parking.updateOne({_id:parkingId}, {$push:{availability:{$each:[{date, startTime, endTime}]}}},)
        await Parking.updateOne({_id:parkingId}, {$pull:{availability:{date}}}, {multi:true})
        await Parking.updateOne({_id:parkingId}, {$push:{availability:{date, startTime, endTime}}})
       
        return res.status(200).json({
            success: true,
            msg: "Availability hasbeen added successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        let userProfile;
        const user = await Auth.findById(req.data.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const payment = await Payment.find({ userId: req.data.id });
        let totalEarning = 0;
        payment.forEach((el) =>
            totalEarning = totalEarning + parseFloat(el.amount)
        );

        if (payment) {
            walkerProfile = walker.toObject();
            walkerProfile.totalEarning = totalEarning.toFixed(6);
        } else {
            walkerProfile = walker;
        }
        const admin = await Admin.findOne({ role: 'admin' });
        const walkerCommission = admin.walkerCommission;

        return res.status(200).json({ success: true, data: { walker: walkerProfile, walkerCommission } });
    } catch (error) {
    }
};
exports.addPaymentMethod = async (req, res) => {
    try {
        const { cardHolderName, cardMethod, cardNumber, expiryDate, cvvNumber } = req.body;
        const { parkingImage } = req.files;
        const check_exist = await Auth.findById(req.data.id);
        if (!check_exist) return res.status(404).json({ error: 'User not found' })

        let new_parking = new Parking({
            merchantId: req.data.id,
            parkingName,
            price,
            address,
            contactInfo: {
                name,
                phoneNumber
            },
            about,
            parkingImage: keys.apiURL + parkingImage[0].filename || keys.apiURL + "default.png"
        });
        const save = await new_parking.save();
        return res.status(200).json({
            success: true,
            msg: "Parking hasbeen added successfully",
            data: { parkingDetails: save },
        });
    }
    catch (error) {
        return error.message;
    }
}
exports.addBankAccount = async (req, res) => {
    try {
        const { routingNumber, accountNumber, ifscNumber, accountHolderName} = req.body;
        const check_exist = await Auth.findById(req.data.id);
        if (!check_exist) return res.status(404).json({ error: 'User not found' })

        let new_parking = new Parking({
            merchantId: req.data.id,
            parkingName,
            price,
            address,
            contactInfo: {
                name,
                phoneNumber
            },
            about,
            parkingImage: keys.apiURL + parkingImage[0].filename || keys.apiURL + "default.png"
        });
        const save = await new_parking.save();
        return res.status(200).json({
            success: true,
            msg: "Parking hasbeen added successfully",
            data: { parkingDetails: save },
        });
    }
    catch (error) {
        return error.message;
    }
}
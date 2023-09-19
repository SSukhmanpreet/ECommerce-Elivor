//test post request
const test_post = async (req, res) => {
    console.log("IN TEST ROUTE")
    console.log(req.body);
    console.log("ABOUT TO SEND RESPONSE")
    return res.status(200).json({ bdy: req.body, message: "SENT BODY AND RESPONSE SUCCESSFULLY" })
};

module.exports = {
    test_post,
};
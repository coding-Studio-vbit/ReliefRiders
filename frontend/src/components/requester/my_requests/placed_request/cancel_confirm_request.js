/* eslint-disable no-undef */
const cancelConfirmRequest = async (token, requestID,cancel=false) => {
    try {
        let url
         if(cancel)
         url = `${process.env.REACT_APP_URL}/requester/cancelRequest/${requestID}`;
         else
         url = `${process.env.REACT_APP_URL}/requester/confirmRequest/${requestID}`;
        console.log(url);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                authorization: "Bearer " + token,
            },
        });
        
        const data = await res.json();
        console.log(data);
        if (data.status[0] === "s") {
            return 1;
        } else {
            return data.message;
        }
    } catch (error) {
        return error;
    }
};
export default cancelConfirmRequest;

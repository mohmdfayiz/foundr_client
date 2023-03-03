import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-hot-toast";

const Paypal = ({ event }) => {
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: event.mentorName,
            amount: {
              currency_code: "USD",
              value: 49,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    toast.error("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      toast.success("Payment successfull✨");
      console.log("Order successful . Your order id is--", orderID);
      handleJoin();
    }
  }, [success]);

  const handleJoin = async () => {
    const token = localStorage.getItem("token");
    const { status } = await axios.post(
      `/api/user/joinEvent`,
      { eventId: event._id, joinLink: event.joinLink },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (status === 201) {
      toast.success("We have sent an invitaion to your email.");
    }
  };

  return (
    <>
      <PayPalScriptProvider
        options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default Paypal;

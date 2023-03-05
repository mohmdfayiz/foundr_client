import { createSlice } from "@reduxjs/toolkit";
export const modalSlice = createSlice({
  name: "eventModal",
  initialState: {
    visible: false,
    event: {},
    paymentStatus: false,
  },
  reducers: {
    modalVisiblity: (state) => {
      state.visible = !state.visible;
    },
    setEvent: (state, data) => {
      state.event = data.payload;
    },
    setPaymentStatus: (state) => {
      state.paymentStatus = !state.paymentStatus;
    },
  },
});

export const { modalVisiblity, setEvent, setPaymentStatus } =
  modalSlice.actions;
export default modalSlice.reducer;

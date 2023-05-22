import { configureStore } from "@reduxjs/toolkit";
import { storesReducer } from "./slices/storesSlice";
import { usersReducer } from "./slices/usersSlice";
import { typesReducer } from "./slices/typesSlice";
import { animalReducer } from "./slices/animalsSlice";
import { appointmentReducer } from "./slices/appointment";

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    users: usersReducer,
    types: typesReducer,
    animals: animalReducer,
    appointments: appointmentReducer
  }
})



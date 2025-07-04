import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getAddress } from "../../service/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

type positions = {
  latitude: number;
  longitude: number;
};
type fetchAddressPayload = {
  position: positions;
  address: string;
};
export const fetchAddress = createAsyncThunk(
  "User/SET_ADDRESS",
  async function fetchAddress(_, { rejectWithValue }) {
    try {
      const positionObj: unknown = await getPosition();
      const { latitude, longitude } = (
        positionObj as { coords: { latitude: number; longitude: number } }
      ).coords;
      const position: positions = {
        latitude,
        longitude,
      };

      const addressObj = await getAddress(
        position.latitude,
        position.longitude
      );

      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
      return { position, address };
    } catch (err) {
      console.log(err);
      if (err && typeof err === "object" && "message" in err) {
        return rejectWithValue((err as { message: string }).message);
      }
      return rejectWithValue("Failed to fetch address");
    }
  }
);

type State = {
  user: string;
  address: string;
  loader: boolean;
  error: string;
};
const initialState: State = {
  user: "",
  address: "",
  loader: false,
  error: "",
};
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    SET_USER(state: State, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(fetchAddress.pending, (state: State) => {
        state.loader = true;
      })
      .addCase(
        fetchAddress.fulfilled,
        (state: State, action: PayloadAction<fetchAddressPayload>) => {
          state.loader = false;
          state.error = "";
          if (action.payload) {
            state.address = action.payload.address;
          }
        }
      )
      .addCase(fetchAddress.rejected, (state: State, action) => {
        state.loader = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "Failed to fetch address";
      });
  },
});

export const { SET_USER } = userSlice.actions;

export default userSlice.reducer;

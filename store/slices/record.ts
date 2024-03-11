import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "..";
import axios from "axios";

// const MOCK_DATA = {
//   videoUrl: "https://dscountpython.s3.amazonaws.com//tmp/merged_2d0a346f-67d4-4434-9b13-bf9b9aabe950.mp4",
//   id: "7f7bbee5-4c24-4e67-915e-048981277a27",
//   userid: "1GDztlpyxMfNFjgzoLjyAK745EU2",
//   permissions: [
//       "example1@example.com",
//       "example2@example.com",
//       "example3@example.com"
//   ],
//   note: [
//       {
//           "time": "2023-03-10T14:00:00Z",
//           "content": "Đây là nội dung ghi chú số 1"
//       },
//       {
//           "time": "2023-03-10T15:00:00Z",
//           "content": "Đây là nội dung ghi chú số 2"
//       }
//   ],
//   transcripts: "Đây là nội dung bản ghi âm được chuyển ngữ từ video."
// }

// const MOCK_DATA_LIST = [
//   {
//     videoUrl: "https://dscountpython.s3.amazonaws.com//tmp/merged_2d0a346f-67d4-4434-9b13-bf9b9aabe950.mp4",
//     id: "2d0a346f-67d4-4434-9b13-bf9b9aabe950",
//     title: "meeting_2024-03-05_03-34-51"
//   },
//   {
//   videoUrl: "https://dscountpython.s3.amazonaws.com//tmp/merged_2d0a346f-67d4-4434-9b13-bf9b9aabe950.mp4",
//   id: "2d0a346f-67d4-4434-9b13-bf9b9aabe950",
//   title: "meeting_2024-03-05_03-34-51"
//   },
// ]


const initialState = {
  error: null,
  records: [],
  record: null,
};

const slice = createSlice({
  name: "record",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getRecordsSuccess(state, action) {
      state.records = action.payload;
    },
    getRecordSuccess(state, action) {
      state.record = action.payload;
    },
  },
});

export default slice.reducer;

export function getRecords() {
  return async () => {
    try {
      const response = await axios.get("https://2e5d751xi4.execute-api.ap-southeast-2.amazonaws.com/Prod/", {
        headers: {
          Authorization: window.localStorage.getItem("user")
        }
      });
      dispatch(slice.actions.getRecordsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRecord(id: string) {
  return async () => {
    try {

      const response = await axios.get(`https://ixmem9ssq8.execute-api.ap-southeast-2.amazonaws.com/Prod/${id}/`);
      dispatch(slice.actions.getRecordSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

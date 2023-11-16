// coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses, createCourse, updateCourse, deleteCourse, calculateCourseRating } from '../thunks/courseThunk';

export const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    data: [],
    loading: false,
    error: null,
    courseRating: 0,
  },
  reducers: {
    // Thêm reducers đồng bộ nếu cần
    clearCourses: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.courseRating = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const updatedIndex = state.data.findIndex((course) => course.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.data[updatedIndex] = action.payload;
        }
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.data = state.data.filter((course) => course.id !== action.payload);
      })
      .addCase(calculateCourseRating.fulfilled, (state, action) => {
        state.courseRating = action.payload;
      });
  },
});

export const { clearCourses } = coursesSlice.actions;

export const selectCourses = (state) => state.courses;

export default coursesSlice.reducer;

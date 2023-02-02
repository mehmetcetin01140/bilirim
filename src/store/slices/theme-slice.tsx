import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeStateTypes {
  hoveredCategory: {
    homePageHoveredImgPath: string;
    homePageHoveredVideo: string;
  }

}
interface ActionTypes {
  category: string;
  videoPath: string;
}


const initialState: ThemeStateTypes = {
  hoveredCategory: {
    homePageHoveredImgPath: "/assets/homepagebanner.jpeg",
    homePageHoveredVideo: "",
  },

} as const;

export const ThemeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {
    setHomePageHoveredCategory: (
      state: Draft<typeof initialState>,
      action: PayloadAction<ActionTypes>
    ) => {
      state.hoveredCategory.homePageHoveredImgPath = action.payload.category;
      state.hoveredCategory.homePageHoveredVideo = action.payload.videoPath;
    },
  
  },
});


export const getThemeState = (state: { Theme: ThemeStateTypes }) => state.Theme;


export const { setHomePageHoveredCategory } = ThemeSlice.actions;

export default ThemeSlice.reducer;

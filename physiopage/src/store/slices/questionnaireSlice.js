import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    offwork: false,
    treatment: false,
    duration: true,
    offworkduration: false,
    radioeducation: true,
    radiodiagnosis: true,
    exercisecount: false,
    apptfrequency: false,
    caremodality: false,
    careprovider: false,
    diagnosis: true,
    bodypart: true,
}
const questionnaireSlice = createSlice({
    name: "questionnaire-ticks",
    initialState,
    reducers: {
        changeTick(state, action){
            const { checkBoxName, idArray, checked } = action.payload;
            state[checkBoxName] = checked;
       idArray.map(id => { state[id] = checked})   
       }
    },
})

export const questionnaireActions = questionnaireSlice.actions

export default questionnaireSlice.reducer

import { useReducer, useEffect } from "react";
import { Record } from "./App";
import { v4 as uuidv4 } from 'uuid';
const initialState = {
    records: [],
    successMessage: false,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "SAVE_RECORD":
            const newRecord={...action.payload, id:uuidv4()}
            return {
                ...state,
                records: [...state.records, newRecord],
                successMessage: true,
            };
        case "UPDATE_RECORD":
            const updatedRecords = state.records.map((record: Record) => {
                if (record.id === action.payload.id) {
                    return action.payload;
                }
                return record;
            })
            return {
                ...state,
                records: updatedRecords
            };
        case "DELETE_RECORD":
            const filteredRecords = state.records.filter(
                (record: Record) => {
                    return record.id !== action.payload.id;
                }
            );
            return {
                ...state,
                records: filteredRecords
            };
        case "FETCH_RECORDS":
            return {
                ...state,
                records: action.payload
            };
        default:
            return state;
    }
};

export const useRecordManagement = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const saveRecord = (newRecord: Record) => {
        dispatch({ type: "SAVE_RECORD", payload: newRecord });
    }
    const updateRecord = (updatedRecord: Record) => {
        dispatch({ type: "UPDATE_RECORD", payload: updatedRecord });
    }
    const deleteRecord = (deletedRecord: Record) =>{
        dispatch({ type: "DELETE_RECORD", payload: deletedRecord });
    }

    const fetchRecords = async () => {
        const response = await fetch(
            "https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8"
        );
        if (!response.ok) {
            throw new Error("Data could not be fetched!");
        } else {
            const data = await response.json();
            const recordsWithId = data.map((record: any) => {
                    return { ...record, id: uuidv4() };
                  });
            dispatch({ type: "FETCH_RECORDS", payload: recordsWithId });
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return {
        records: state.records,
        handleSave: saveRecord,
        handleUpdate: updateRecord,
        handleDelete: deleteRecord,
        successMessage: state.successMessage,
    };
};


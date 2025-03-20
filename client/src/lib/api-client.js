// const { HOST } = require("@/utils/constants");
// const { default: axios } = require("axios");
import axios from "axios";
import {HOST} from "@/utils/constants"

// You have not change the Module


export const apiClient = axios.create({
    baseURL: HOST,
});


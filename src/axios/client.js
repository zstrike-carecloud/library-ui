import axios from 'axios';
import socketIOClient from 'socket.io-client';

const networkUrlHome = 'http://10.0.1.20:4001';
const newtworkURLWork = 'http://192.168.125.120:4001'

export const axiosClient = axios.create({
    baseURL: networkUrlHome,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

export const socketIoClient = socketIOClient(networkUrlHome);
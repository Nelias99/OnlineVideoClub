import axios from 'axios';
import router from '../router/index';
const serverAdress ="http://localhost:5000";

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null,
    users:[]
};

const getters = {

    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error,
    users: state => state.users
};

const actions = {
    // Login Action
    async login({
        commit
    }, user) {
        commit('auth_request');
        try {
            let res = await axios.post(serverAdress+'/auth/login', user)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
        
            }
           
            return res;
        } catch (err) {
            commit('auth_error', err);
            
            return err;

        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post(serverAdress+'/auth/register', userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    async getusers({commit}){
        let res = await axios.get(serverAdress+'/admin/userlist');
        commit("users_request",res.data);

    },
    // Get the user Profile
    async getProfile({
        commit
    }) {
        commit('profile_request');
        let res = await axios.get(serverAdress+'/auth/profile')
        commit('user_profile', res.data.user)
        return res;
    },
    // Logout the user
    async logout({
        commit
    }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    }
    ,async updateprofile({commit},user){
        commit('user_profile');
        axios.put(serverAdress+"/auth/updateProfile/"+user._id,user);
    }


};

const mutations = {
    users_request(state,users){
        state.users = users
    },
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
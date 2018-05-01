import state from './state'

export default {
    countLinks: state => {
        if (state.links.length == null) {
            return "hi";
        } else {
            return state.links.length;
        }
    } 
}
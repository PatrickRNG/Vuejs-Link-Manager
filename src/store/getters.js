import state from './state'

export default {
    countLinks: state => {
        return state.links.length;
    } 
}
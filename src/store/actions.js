export default {
    removeLink: (context, payload) => {
    context.commit('REMOVE_LINK', payload)
    },

    formatLink: (context, payload, link) => {
    context.commit('FORMAT_LINK', payload, link)
    },

    getLCitems: (context, payload) => {
    context.commit('GET_LC_ITEMS', payload)
    },

    getVisitedLCitems: (context, payload) => {
        context.commit('GET_VISITED_LC_ITEMS', payload)
    },

    removeAll({commit}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        commit('REMOVE_ALL')
        resolve()
        }, 1000)
    });
    }
}
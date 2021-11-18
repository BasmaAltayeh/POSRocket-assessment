import { createStore } from 'vuex'

export type State = {
  charts:{
    id: number; 
    order: number; 
    priority: number; 
    type: string; 
    title: string; 
    style: string; 
    data?:any;
  }[]
}
const state:State = {
  charts:null
}
export const store= createStore({
  state,
  mutations: {
    setMeta(state:State,data):void{
      state.charts = data;
    },
    setChartData(state:State,data):void{
      state.charts[data.index].data = data.value;
      state.charts= [...state.charts]
      
    }
  },
  actions: {
    setMeta({commit}, data):void{
      commit("setMeta",data)
    },
    setChartData({commit}, data):void{
      commit("setChartData",data)
    }
  },
  getters:{
    getCharts(state:State){
      return state.charts;
    }
  }
})

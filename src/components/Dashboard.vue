<template>
    <div  class="dashboard">
        <div class="page-title">
            Welcome to dynamic dashboard
        </div>
        <div v-for="(chart,key) in charts" :key='key' :class="'chart-wrapper '+'style-'+chart.style">
            <img v-if="charts && !chart.data" class="loading-icon" src="../assets/tail-spin.svg" />
            <ChartBuilder :id="chart.id" v-if="charts && chart.data"/>
        </div>
    </div>
</template>

<script >
    import ChartBuilder from "./ChartBuilder.vue"
    import axios from 'axios';

    export default {
        components: {
            ChartBuilder,
        },
        data(){
            return{
                priorityList:null,
                currentPriority:0
            }
        },
        created(){
            this.getMetaData();
        },
        computed:{
            charts(){
                return this.$store.getters.getCharts
            }
        },
        methods:{
            getMetaData(){ // get all meta data for the charts
                axios.get(`https://6192313daeab5c0017105e25.mockapi.io/api/meta`)
                .then((response) => {
                    response.data= response.data.sort((a,b)=>a.order-b.order) //sort the charts depending on the order
                    this.$store.dispatch("setMeta",response.data); // store the charts meta data in vuex
                    this.priorityList= [...new Set(response.data.map((item) => item.priority))].sort();// create an array of all unique priorities
                    this.getData(); //get data depend on the priority
                })
            },
            getData(){
                const currentCharts = this.charts.filter(item=>item.priority === this.priorityList[this.currentPriority])// get all charts with the current priority
                const requests = [];
                //collect all request promises which has the current priority in one array
                for (let i = 0; i < currentCharts.length; i++) {
                    requests.push(axios.get(`https://6192313daeab5c0017105e25.mockapi.io/api/chart-data/${currentCharts[i].id}`))
                }
                // call all the promises in the array at the same time
                axios.all(requests).then(axios.spread((...res)=>{
                    //assign the chart data to the charts variable in the store
                    for (let j = 0; j < res.length; j++) {
                        
                        this.$store.dispatch("setChartData",{index:this.charts.findIndex(item=>item.id === currentCharts[j].id),value:res[j].data.data});
                    }
                    //go to the next index in the priority list
                    this.currentPriority++;
                    // stop condition for the recursion
                    if(this.currentPriority < this.priorityList.length){
                        this.getData();
                    }
                }))
            }
        }
    }
</script>

<style lang="scss" scoped>
    
    .dashboard{
        display: flex;
        flex-wrap: wrap;
        padding: 0.1rem;
        .page-title, &> div {
            padding:1rem;
            background-color:white;
            box-sizing: content-box;
            box-sizing: border-box;
            border: solid 1px #E0E0E0;
            border-radius: 0.2rem;
        }
        .page-title{
            width:100%;
            margin:0px 0.315rem;
            text-align: left;
            font-weight: bold;
        }
        &> div{
            margin:0.315rem;
            position: relative;
            overflow:auto;
        }
        .style-1{
            width:calc(100% - 0.63rem);
        }
        .style-2{
            width:calc(50% - 0.63rem);
        }
        .style-3{
            width:calc(33.3333% - 0.63rem);
        }
        .style-4{
            width:calc(66.6666% - 0.63rem);
        }
    }
    @media only screen and (max-width: 700px) {
        .dashboard{
            .style-2, .style-3, .style-4 {
                width:calc(100% - 0.63rem);
            }
        } 
    }
</style>

<template>
    <div>
        <template v-if="['pie','line','doughnut'].indexOf(chartData.type) !== -1">
            <div class="chart-title">{{chartData.title}}</div>
            <canvas class="chart" ref="chart" ></canvas>
        </template>
        <table v-if="chartData.type ==='table'">
            <caption class="chart-title">{{chartData.title}}</caption>
            <thead>
                <tr>
                    <th  v-for="(heading,key) in chartData.data.headers" :key="key">
                        {{heading.title}}
                    </th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row,rowKey) in chartData.data.data" :key="rowKey">
                    <td v-for="(heading,headingKey) in chartData.data.headers" :key="headingKey">{{row[heading.value]}}</td>
                </tr>
            </tbody>
        </table>
        <div class="numeric" v-if="chartData.type == 'numeric'" >
            <h4 >{{chartData.data.title}}</h4>
            <p class="numeric-value">{{chartData.data.value}}</p>
            <p  class="numeric-percentage">({{chartData.data.percentage}})</p>
        </div>
    </div>
</template>

<script>
    import {useStore} from "vuex"
    import Chart from 'chart.js/auto'

    export default {
        props:{
            id:String
        },
        computed:{
            chartData(){ 
                return this.$store.getters.getCharts.find(item => item.id === this.id ) 
            }
        },
        mounted(){
            if(['pie','line','doughnut'].indexOf(this.chartData.type) !== -1){
                this.drawChart();
            }
        },
        methods:{
            drawChart(){
                const ctx = this.$refs.chart.getContext('2d');
                const myChart = new Chart(ctx, {
                    type: this.chartData.type,
                    data:this.chartData.data.data,
                    options: this.chartData.data.options
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.chart-title{
    font-weight: bold;
    margin-bottom: 0.625rem;
}
.numeric{
    text-align: left;
    h4{
        border-bottom: solid 2px #E8E8E8;
        font-weight: bold;
        margin: 0 0 0.625rem 0;
    }
    .numeric-value {
        margin:0px 0 1.25rem 0;
    }
    .numeric-percentage{
        position:absolute;
        margin: 0;
        left: 1rem;
        bottom: 0.5rem;
        font-size: 0.8rem;
    }
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 0.5rem;
    }
    th{
        background: lightgrey;
    }
}
</style>
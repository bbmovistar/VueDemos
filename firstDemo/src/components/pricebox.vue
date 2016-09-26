<template>
	<div class="priceBox" v-show="checked">
		<div class="priceBox_tip">*门票价格会随节假日浮动</div>
		<div class="priceBox_calc">
			<span class="priceBox_calc_s">¥{{select.price}}</span>
			<span class="priceBox_calc_add" @click="addNum"></span>
			<span class="priceBox_calc_num">{{num}}</span>
			<span class="priceBox_calc_redu" @click="reduNum"></span>
			<span class="priceBox_calc_remain">剩余库存：{{select.remain}}</span>
		</div>
		<div class="priceBox_foot">
			<h1 class="priceBox_foot_h">¥{{total}}</h1>
			<input type="button" class="priceBox_foot_btn" value="预定">
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['select'],
		data: function(){
			return {
				num: 1,
				total: 0,
			}
		},
		// vuex: {
		// 	getters: {
		// 		select: function(state){
		// 			return state.select;
		// 		},
		// 		checked: function(state){
		// 			return state.checked;
		// 		}
		// 	}
		// },
		watch: {
			'select': function(newVal, oldVal){
				this.total = this.select.price;
				this.num = 1;
			}
		},
		events: {
			'select-msg': function(msg){
				this.select = msg;
				this.total = this.select.price;
				this.num = 1;
			}
		},
		methods: {
			addNum: function(){
				if (this.num < this.select.remain) {
					this.num = this.num+1;
					this.total = (this.num * this.select.price).toFixed(1);
				}else{
					alert('余票不足！');
				}
			},
			reduNum: function(){
				if(this.num > 1){
					this.num = this.num-1;
					this.total = (this.num * this.select.price).toFixed(1);
				}
			}
		}
	}
</script>
<template>
	<div class="ticketBox">
		<div class="ticket" v-for="ticket in tickets">
			<div class="ticketHeader">
				<span class="ticketRemain" style="display: none">{{ticket.remain}}</span>
				<span class="ticketName">{{ticket.name}}</span>
				<span class="currency">¥<span class="ticketPrice">{{ticket.price}}</span></span>
			</div>
			<div class="ticketContent">
				<div class="ticketInfo">{{ticket.info}}</div>
			</div>
			<div class="ticketCheck" @click="getSelected"></div>
		</div>
	</div>
</template>

<script>
import { updateSelect } from '../vuex/actions'

	module.exports = {
		// props: ['tickets'],
		data: function(){
			return {
				ticketDetail: {},
				checked: true
			}
		},
		vuex: {
			getters: {
				tickets: function(state){
					return state.tickets;
				}
			}，
			actions: {
				updateSelect: updateSelect
			}
		},
		ready: function(){
			//选中第一个
			$('.ticket:first-child .ticketCheck').trigger('click');
		},
		methods: {
			getSelected: function(e){
				$(e.target).parent().toggleClass("checked");
				$(e.target).parent().siblings().removeClass('checked');
				if($(e.target).parent().hasClass('checked')){
					this.resetTicketDetail(e);
					this.checked = true;
				}else{
					this.ticketDetail = {};	
					this.checked = false;	
				}
				// this.dispatchMsg();
				this.updateSelect(this.ticketDetail, this.checked);
			},
			resetTicketDetail: function(e){
				this.ticketDetail = {};
				this.ticketDetail.price = $(e.target).parent().find('.ticketPrice').text();
				this.ticketDetail.remain = $(e.target).parent().find('.ticketRemain').text();
			},
			dispatchMsg: function(){
				this.$dispatch('selected',this.ticketDetail);
				this.$dispatch('checked', this.checked);
			}
		},
		events: {
			'ticket-msg': function(){
				$('.ticket:first-child .ticketCheck').trigger('click');
			}
		}
	}
</script>